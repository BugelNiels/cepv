import io
import json
import pathlib
import tarfile
import zipfile

import requests
from requests import Response

from cepv_api.exceptions import InvalidUrlException, FormatNotSupportedException, EventNotFoundException


def call_cern_api(route: str) -> Response:
    api_url: str = 'https://opendata.cern.ch/api/%s' % route
    res: Response = requests.get(api_url)

    if res.status_code == 200:
        return res
    raise InvalidUrlException('Could not access api route %s' % api_url)


def call_cern_file_api(rec_id: int, file_name: str) -> Response:
    api_file_url: str = 'https://opendata.cern.ch/record/%s/files/%s' % (rec_id, file_name)
    res: Response = requests.get(api_file_url)

    if res.status_code == 200:
        return res
    raise InvalidUrlException('Could not access api route %s' % api_file_url)


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
            raise FormatNotSupportedException('File format %s is not supported' % extension)


def get_all_events_in_run(archive_data: io.BytesIO, archive_name: str, run_id: int) -> list[int]:
    extension: str = ''.join(pathlib.Path(archive_name).suffixes)

    match extension:
        case '.tar' | 'tar.gz':
            with tarfile.open(fileobj=archive_data, mode='r') as archive_ref:
                file_names: list[str] = archive_ref.getnames()
                file_prefix: str = 'Events/Run_%s' % run_id
                trim_len: int = len(file_prefix) + len('/Event_')
                event_names: list[int] = [int(name[trim_len:]) for name in file_names if name.startswith(file_prefix)]
                return event_names
        case '.zip' | '.ig':
            with zipfile.ZipFile(archive_data, 'r') as archive_ref:
                file_names: list[str] = archive_ref.namelist()
                file_prefix: str = 'Events/Run_%s' % run_id
                trim_len: int = len(file_prefix) + len('/Event_')
                event_names: list[int] = [int(name[trim_len:]) for name in file_names if name.startswith(file_prefix)]
                return event_names
        case _:
            raise FormatNotSupportedException('File format %s is not supported' % extension)


def get_run_events(run_id: int, file_names: list[str]) -> dict:
    event_dir: str = 'Events/Run_%s' % run_id
    event_trim_len: int = len(event_dir) + len('/Event_')
    event_ids: list[int] = [int(name[event_trim_len:]) for name in file_names if name.startswith(event_dir)]
    return {
        "id": run_id,
        "directory": event_dir,
        "events": event_ids
    }


def get_events_in_record(archive_data: io.BytesIO, archive_name: str) -> list[dict]:
    extension: str = ''.join(pathlib.Path(archive_name).suffix)
    run_dir_prefix: str = 'Events/Run_'
    trim_len: int = len(run_dir_prefix)

    # TODO: better matching for .tar.gz/ .tar.*
    match extension:
        case '.tar' | '.gz':
            with tarfile.open(fileobj=archive_data, mode='r') as archive_ref:
                file_names: list[str] = archive_ref.getnames()
                run_ids: list[str] = [name[trim_len:].split('/', 1)[0] for name in file_names]
                run_ids.remove('')
                run_ids = list(set(run_ids))
                events_data: list[dict] = [
                    get_run_events(int(dir_name), file_names) for dir_name in run_ids
                ]
                return events_data
        case '.zip' | '.ig':
            with zipfile.ZipFile(archive_data, 'r') as archive_ref:
                file_names: list[str] = archive_ref.namelist()
                run_ids: list[str] = [name[trim_len:].split('/', 1)[0] for name in file_names]
                run_ids.remove('')
                run_ids = list(set(run_ids))
                events_data: list[dict] = [
                    get_run_events(int(dir_name), file_names) for dir_name in run_ids
                ]
                return events_data
        case _:
            raise FormatNotSupportedException('File format %s is not supported' % extension)


def get_event_in_run(archive_data: io.BytesIO, archive_name: str, run_id: int, event_id: int) -> dict:
    extension: str = ''.join(pathlib.Path(archive_name).suffixes)

    run_name: str = 'Events/Run_%s/Event_%s' % (run_id, event_id)
    match extension:
        case '.tar' | 'tar.gz':
            with tarfile.open(fileobj=archive_data, mode='r') as archive_ref:
                if run_name in archive_ref.getnames():
                    # Read the contents of the file into a variable
                    with archive_ref.extractfile(run_name) as file:
                        content: dict = json.load(file)
                        return content
                raise EventNotFoundException('Could not find event: %s' % run_name)
        case '.zip' | '.ig':
            with zipfile.ZipFile(archive_data, 'r') as archive_ref:
                if run_name in archive_ref.namelist():
                    # Read the contents of the file into a variable
                    with archive_ref.open(run_name) as file:
                        content: dict = json.load(file)
                        return content
                raise EventNotFoundException('Could not find event: %s' % run_name)
        case _:
            raise FormatNotSupportedException('File format %s is not supported' % extension)


def get_archive(rec_id: int) -> (str, io.BytesIO):
    '''Given a record id, returns a tuple consisting of the name of the archive and the plain bytes of the corresponding archive.'''
    response: Response = call_cern_api('records/%s' % rec_id)
    event_summary: dict = response.json()

    archive_name: str = event_summary['metadata']['files'][0]['key']
    file_res: Response = call_cern_file_api(rec_id, archive_name)
    return archive_name, io.BytesIO(file_res.content)


def extract_single_record(hit: dict) -> dict:
    experiment_full: str = hit['metadata']['relations'][0]['title']
    name_end_idx: int = experiment_full.find('/', 1)
    run_end_idx: int = experiment_full.find('/', name_end_idx + 1)
    experiment_name: str = experiment_full[1:name_end_idx]
    experiment_run: str = experiment_full[name_end_idx + 1: run_end_idx]
    hit_id: int = hit['id']
    return {'name': experiment_name,
            'run': experiment_run,
            'id': hit_id}


def extract_record_info(json_record_all: dict) -> list[dict]:
    return [extract_single_record(hit) for hit in json_record_all['hits']['hits'] if 'relations' in hit['metadata']]
