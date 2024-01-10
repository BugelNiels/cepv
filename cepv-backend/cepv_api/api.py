import io
import json
import zipfile
import tarfile
import pathlib

import requests

from requests.models import Response
from flask import (Blueprint, jsonify)
from flask.typing import ResponseReturnValue

from cepv_api.exceptions import InvalidUrlException, EventNotFoundException

bp: Blueprint = Blueprint('api', __name__, url_prefix='/api')


def get_all_runs(archive_data: io.BytesIO, archive_name: str) -> list[int]:
    extension: str = ''.join(pathlib.Path(archive_name).suffix)
    event_dir: str = 'Events/Run_'
    trim_len: int = len(event_dir)

    # TODO: better matching for .tar.gz/ .tar.*
    match extension:
        case '.tar' | '.gz':
            with tarfile.open(fileobj=archive_data, mode='r') as archive_ref:
                file_names: list[str] = archive_ref.getnames()
                directory_names: list[str] = [name[trim_len:].split('/', 1)[0] for name in file_names]
                directory_names.remove('')
                return list(map(int, set(directory_names)))
        case '.zip' | '.ig':
            with zipfile.ZipFile(archive_data, 'r') as archive_ref:
                file_names: list[str] = archive_ref.namelist()
                # TODO: make this more robust; currently assumes a specific directory structure
                directory_names: list[str] = [name[trim_len:].split('/', 1)[0] for name in file_names]
                directory_names.remove('')
                return list(map(int, set(directory_names)))
        case _:
            return []


def get_all_events_in_run(archive_data: io.BytesIO, archive_name: str, runid: int) -> list[int]:
    extension: str = ''.join(pathlib.Path(archive_name).suffixes)

    match extension:
        case '.tar' | 'tar.gz':
            with tarfile.open(fileobj=archive_data, mode='r') as archive_ref:
                file_names: list[str] = archive_ref.getnames()
                file_prefix: str = 'Events/Run_%s' % runid
                trim_len: int = len(file_prefix) + len('/Event_')
                event_names: list[int] = [int(name[trim_len:]) for name in file_names if name.startswith(file_prefix)]
                return event_names
        case '.zip' | '.ig':
            with zipfile.ZipFile(archive_data, 'r') as archive_ref:
                file_names: list[str] = archive_ref.namelist()
                file_prefix: str = 'Events/Run_%s' % runid
                trim_len: int = len(file_prefix) + len('/Event_')
                event_names: list[int] = [int(name[trim_len:]) for name in file_names if name.startswith(file_prefix)]
                return event_names
        case _:
            return []


def get_event_in_run(archive_data: io.BytesIO, archive_name: str, runid: int, eventid: int):
    extension: str = ''.join(pathlib.Path(archive_name).suffixes)

    run_name: str = 'Events/Run_%s/Event_%s' % (runid, eventid)
    match extension:
        case '.tar' | 'tar.gz':
            with tarfile.open(fileobj=archive_data, mode='r') as archive_ref:
                if run_name in archive_ref.getnames():
                    # Read the contents of the file into a variable
                    with archive_ref.extractfile(run_name) as file:
                        content = json.load(file)
                        print(type(content))
                        return content
                raise EventNotFoundException('Could not find event: %s' % run_name)
        case '.zip' | '.ig':
            with zipfile.ZipFile(archive_data, 'r') as archive_ref:
                if run_name in archive_ref.namelist():
                    # Read the contents of the file into a variable
                    with archive_ref.open(run_name) as file:
                        content = json.load(file)
                        print(type(content))
                        return content
                raise EventNotFoundException('Could not find event: %s' % run_name)
        case _:
            return []


def get_archive(recid: int) -> (str, io.BytesIO):
    record_summary_url: str = 'https://opendata.cern.ch/api/records/%s' % recid
    response: Response = requests.get(record_summary_url)

    if response.status_code == 404:
        raise InvalidUrlException('Could not find record with id %s' % recid)

    event_summary = response.json()

    archive_name: str = event_summary['metadata']['files'][0]['key']
    record_url: str = 'https://opendata.cern.ch/record/%s/files/%s' % (recid, archive_name)
    event_data_res: Response = requests.get(record_url)

    if event_data_res.status_code == 200:
        archive_data: io.BytesIO = io.BytesIO(event_data_res.content)
        return archive_name, archive_data
    raise InvalidUrlException('Could not find archive for record id %s' % recid)


@bp.route('/records')
def records() -> ResponseReturnValue:
    record_num_hits_url: str = 'https://opendata.cern.ch/api/records/?page=1&size=1&q=&subtype=Derived&type=Dataset&experiment=CMS&file_type=ig'
    response_num_hits: Response = requests.get(record_num_hits_url)
    if response_num_hits.status_code == 404:
        raise InvalidUrlException('Could not find records')
    num_hits: int = response_num_hits.json()['hits']['total']

    record_all_url: str = 'https://opendata.cern.ch/api/records/?page=1&size=%s&q=&subtype=Derived&type=Dataset&experiment=CMS&file_type=ig' % num_hits
    response_all: Response = requests.get(record_all_url)
    if response_all.status_code == 404:
        raise InvalidUrlException('Could not find records')
    json_record_all = response_all.json()
    recids: list[int] = list(map(lambda h: h['id'], json_record_all['hits']['hits']))
    return recids, 200


@bp.route('/records/<recid>')
def record_id(recid: int) -> ResponseReturnValue:
    if not recid.isdigit():
        return 'Invalid Record Id', 400
    try:
        (archive_name, archive_data) = get_archive(recid)
        file_names: list[int] = get_all_runs(archive_data, archive_name)
        return jsonify(runs=file_names), 200
    except InvalidUrlException as e:
        print(f'Error: {e}')
        return 'Invalid Record Id', 400
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return 'Invalid Record Id', 400


@bp.route('/records/<recid>/runs/<runid>')
def record_run(recid: int, runid: int) -> ResponseReturnValue:
    if not recid.isdigit():
        return 'Invalid Record Id', 400
    if not runid.isdigit():
        return 'Invalid Run Id', 400
    try:
        (archive_name, archive_data) = get_archive(recid)
        events: list[int] = get_all_events_in_run(archive_data, archive_name, runid)
        if not events:
            return 'Invalid Run Id', 400
        return jsonify(events=events), 200
    except InvalidUrlException as e:
        print(f'Error: {e}')
        return 'Invalid Record Id', 400
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return 'Invalid Record Id', 400


@bp.route('/records/<recid>/runs/<runid>/events/<eventid>')
def record_run_event(recid: int, runid: int, eventid: int) -> ResponseReturnValue:
    if not recid.isdigit():
        return 'Invalid Record Id', 400
    if not runid.isdigit():
        return 'Invalid Run Id', 400
    if not eventid.isdigit():
        return 'Invalid Event Id', 400

    try:
        (archive_name, archive_data) = get_archive(recid)
        event_data = get_event_in_run(archive_data, archive_name, runid, eventid)
        if not event_data:
            return 'Invalid Event Id', 400
        return jsonify(event=event_data), 200
    except EventNotFoundException as e:
        print(f'Error: {e}')
        return 'Invalid Event Id', 400
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return 'Event Not Found', 400
