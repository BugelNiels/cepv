import pytest
import numbers

from cepv_api import create_app
from flask.testing import FlaskClient
from werkzeug import Response
import json


# Test getting all main events

def test_get_records_returns_200(client: FlaskClient) -> None:
    response: Response = client.get("/api/records")
    assert response.status_code == 200


def test_get_records_json_content_type(client: FlaskClient) -> None:
    response: Response = client.get("/api/records")
    assert response.content_type == "application/json"


def test_get_records_json_contains_records(client: FlaskClient) -> None:
    response: Response = client.get("/api/records")
    assert 'records' in response.json
    assert len(response.json['records']) > 0


def test_get_records_json_records_contain_data(client: FlaskClient) -> None:
    response: Response = client.get("/api/records")
    for item in response.json['records']:
        assert "name" in item, "key 'name' is not present in record item."
        assert "run" in item, "key 'run' is not present in record item."
        assert "id" in item, "key 'id' is not present in record item."


def test_record_invalid_recid_string_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/abc")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


def test_record_invalid_recid_string_numbers_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/123abc")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


def test_record_nonexistent_recid_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/45366")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


def test_record_negative_recid_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/-45366")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


def test_get_record_id_returns_200(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616")
    assert response.status_code == 200


def test_get_record_id_returns_json(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616")
    assert response.content_type == "application/json"


def test_get_record_id_json_contains_runs_list(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616")
    assert 'runs' in response.json
    actual_data: list[dict] = response.json['runs']
    assert isinstance(actual_data, list), 'Json is not a list %s' % type(actual_data)


def test_get_record_id_json_contains_expected_runs(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616")
    ref_run_list: list[int] = [167674]
    actual_data: list[dict] = response.json['runs']
    assert len(actual_data) == len(ref_run_list), 'Number of items in response does not match expected items'


def test_get_record_id_json_contains_expected_events(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616")
    ref_run_list: list[int] = [167674]
    # TODO: test these specific values
    ref_event_list: set[int] = {255488754,
                                255528844,
                                255540108,
                                255544818,
                                255576152,
                                255579998,
                                255628958,
                                255642628,
                                255696530,
                                255715266,
                                255743010,
                                255770026,
                                255781100,
                                255831348,
                                255845784,
                                255863198,
                                255922138,
                                256195910,
                                256253396,
                                256275264,
                                256294522,
                                256298220,
                                256539610,
                                256540848,
                                256544218}

    actual_data: list[dict] = response.json['runs']
    for expected, actual in zip(ref_run_list, actual_data):
        assert "id" in actual
        assert "directory" in actual
        assert "events" in actual
        assert expected == actual["id"], 'Item does not match'
        assert len(actual["events"]) == len(ref_event_list)


# Test getting all runs within an event
# should return the collision events within said run

def test_get_record_run_invalid_recid_negative_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/-2348/runs/123")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


# TODO: add more tests with invalid recids

def test_get_record_run_invalid_run_string_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/abc")
    assert response.status_code == 400
    assert b"Invalid Run Id" in response.data


def test_get_record_run_invalid_recid_string_numbers_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/123abc")
    assert response.status_code == 400
    assert b"Invalid Run Id" in response.data


def test_get_record_run_nonexistent_recid_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/45366")
    assert response.status_code == 400
    assert b"Invalid Run Id" in response.data


def test_get_record_run_negative_recid_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/-45366")
    assert response.status_code == 400
    assert b"Invalid Run Id" in response.data


def test_get_record_run_returns_200(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674")
    assert response.status_code == 200


def test_get_record_run_returns_json(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674")
    assert response.content_type == "application/json"


def test_get_record_run_json_contains_events_list(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674")
    assert 'events' in response.json
    actual_data: list[int] = response.json['events']
    assert isinstance(actual_data, list), 'Json is not a list %s' % type(actual_data)


def test_get_record_run_json_contains_expected_events(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674")
    ref_list: set[int] = {255488754,
                          255528844,
                          255540108,
                          255544818,
                          255576152,
                          255579998,
                          255628958,
                          255642628,
                          255696530,
                          255715266,
                          255743010,
                          255770026,
                          255781100,
                          255831348,
                          255845784,
                          255863198,
                          255922138,
                          256195910,
                          256253396,
                          256275264,
                          256294522,
                          256298220,
                          256539610,
                          256540848,
                          256544218}

    actual_data: list[int] = response.json['events']
    assert len(actual_data) == len(ref_list), 'Number of items in response does not match expected items'
    for actual in actual_data:
        assert isinstance(actual, numbers.Integral), 'Item in the json list is not a number'
        assert actual in ref_list, 'Item does not match'


# Test getting all runs within an event
# should return the collision events within said run

def test_get_record_run_event_invalid_event_string_returns_400(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/198230/events/abc")
    assert response.status_code == 400
    assert b"Invalid Event Id" in response.data


def test_get_record_run_event_invalid_event_string_numbers(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/198230/events/123abc")
    assert response.status_code == 400
    assert b"Invalid Event Id" in response.data


def test_get_record_run_event_nonexistent_event(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/198230/events/45366")
    assert response.status_code == 400
    assert b"Invalid Event Id" in response.data


def test_get_record_run_event_negative_event(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/198230/events/-45366")
    assert response.status_code == 400
    assert b"Invalid Event Id" in response.data


def test_get_record_run_event_returns_200(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674/events/255488754")
    assert response.status_code == 200


def test_get_record_run_event_returns_json(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674/events/255488754")
    assert response.content_type == "application/json"


def test_get_record_run_event_json_contains_event(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674/events/255488754")
    assert 'event' in response.json


def test_get_record_run_event_json_contains_types(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674/events/255488754")
    assert 'Types' in response.json['event']


def test_get_record_run_event_json_contains_collections(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674/events/255488754")
    assert 'Collections' in response.json['event']


def test_get_record_run_event_json_contains_associations(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674/events/255488754")
    assert 'Associations' in response.json['event']
