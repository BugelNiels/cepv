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
    response: Response = call_cern_api('records/%s' % rec_id)
    event_summary: dict = response.json()

    archive_name: str = event_summary['metadata']['files'][0]['key']
    file_res: Response = call_cern_file_api(rec_id, archive_name)
    return archive_name, io.BytesIO(file_res.content)
