from pathlib import Path

import requests

from requests.models import Response
from flask import (Blueprint, jsonify)
from flask.typing import ResponseReturnValue

from cepv_api.exceptions import InvalidUrlException, EventNotFoundException, FormatNotSupportedException
from cepv_api.cern_helpers import call_cern_api, get_all_runs, get_all_events_in_run, get_event_in_run, get_archive, \
    extract_record_info, get_events_in_record
from cepv_api.cache import cache

bp: Blueprint = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/records')
@cache.cached(timeout=3600)
def get_records() -> ResponseReturnValue:
    try:
        query_options_single_item: str = 'page=1&size=1&subtype=Derived&type=Dataset&experiment=CMS&file_type=ig'
        response_num_hits: Response = call_cern_api('records/?%s' % query_options_single_item)
        num_hits: int = response_num_hits.json()['hits']['total']

        query_options_all_items: str = 'page=1&size=%s&subtype=Derived&type=Dataset&experiment=CMS&file_type=ig' % num_hits
        response_all: Response = call_cern_api('records/?%s' % query_options_all_items)
        json_record_all: dict = response_all.json()
        valid_records: list[dict] = extract_record_info(json_record_all)
        return jsonify(records=valid_records), 200
    except InvalidUrlException as e:
        print(f'Error: {e}')
        return 'Invalid api request to CERN opendata API', 400


@bp.route('/records/<rec_id>')
@cache.cached(timeout=3600, query_string=True)
def get_record_id(rec_id: int) -> ResponseReturnValue:
    if not rec_id.isdigit():
        return 'Invalid Record Id', 400
    try:
        (archive_name, archive_data) = get_archive(rec_id)
        run_data: list[dict] = get_events_in_record(archive_data, archive_name)
        rec_name: str = Path(archive_name).stem
        return jsonify(runs=run_data, recId=rec_id, recName=rec_name), 200
    except InvalidUrlException as e:
        print(f'Error: {e}')
        return 'Invalid Record Id', 400
    except FormatNotSupportedException as e:
        print(f'Error: {e}')
        return 'File format of record not supported', 400
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return 'Invalid Record Id', 400


@bp.route('/records/<rec_id>/runs/<run_id>')
@cache.cached(timeout=3600, query_string=True)
def get_record_run(rec_id: int, run_id: int) -> ResponseReturnValue:
    if not rec_id.isdigit():
        return 'Invalid Record Id', 400
    if not run_id.isdigit():
        return 'Invalid Run Id', 400
    try:
        (archive_name, archive_data) = get_archive(rec_id)
        events: list[int] = get_all_events_in_run(archive_data, archive_name, run_id)
        if not events:
            return 'Invalid Run Id', 400
        return jsonify(events=events), 200
    except InvalidUrlException as e:
        print(f'Error: {e}')
        return 'Invalid Record Id', 400
    except FormatNotSupportedException as e:
        print(f'Error: {e}')
        return 'File format of record not supported', 400
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return 'Invalid Record Id', 400


@bp.route('/records/<rec_id>/runs/<run_id>/events/<event_id>')
@cache.cached(timeout=3600, query_string=True)
def get_record_run_event(rec_id: int, run_id: int, event_id: int) -> ResponseReturnValue:
    if not rec_id.isdigit():
        return 'Invalid Record Id', 400
    if not run_id.isdigit():
        return 'Invalid Run Id', 400
    if not event_id.isdigit():
        return 'Invalid Event Id', 400

    try:
        (archive_name, archive_data) = get_archive(rec_id)
        event_data: dict = get_event_in_run(archive_data, archive_name, run_id, event_id)
        if not event_data:
            return 'Invalid Event Id', 400
        return jsonify(event=event_data), 200
    except EventNotFoundException as e:
        print(f'Error: {e}')
        return 'Invalid Event Id', 400
    except FormatNotSupportedException as e:
        print(f'Error: {e}')
        return 'File format of record not supported', 400
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return 'Event Not Found', 400
