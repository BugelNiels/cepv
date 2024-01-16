import pytest
import numbers

from cepv_api import create_app
from flask.testing import FlaskClient
from werkzeug import Response
import json


# Test getting all main events

def test_records(client: FlaskClient) -> None:
    response: Response = client.get("/api/records")
    assert response.status_code == 200
    assert response.content_type == "application/json"
    assert 'records' in response.json
    for item in response.json['records']:
        assert "name" in item, "key 'name' is not present in record item."
        assert "run" in item, "key 'run' is not present in record item."
        assert "id" in item, "key 'id' is not present in record item."

    assert len(response.json['records']) > 0


# Test getting a specific event
# should return the runs within said event


def test_record_invalid_recid_string(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/abc")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


def test_record_invalid_recid_string_numbers(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/123abc")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


def test_record_nonexistent_recid(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/45366")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


def test_record_negative_recid(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/-45366")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


def test_record_valid_recid(client: FlaskClient) -> None:
    # TODO: extract the asserts
    response: Response = client.get("/api/records/616")
    assert response.content_type == "application/json"
    assert response.status_code == 200
    # see ..
    ref_run_list: list[int] = [167674]

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
    assert isinstance(actual_data, list), 'Json is not a list %s' % type(actual_data)
    assert len(actual_data) == len(ref_run_list), 'Number of items in response does not match expected items'
    for expected, actual in zip(ref_run_list, actual_data):
        assert "id" in actual
        assert "directory" in actual
        assert "events" in actual
        assert expected == actual["id"], 'Item does not match'
        assert len(actual["events"]) == len(ref_event_list)


# Test getting all runs within an event
# should return the collision events within said run

def test_record_run_invalid_recid_negative(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/-2348/runs/123")
    assert response.status_code == 400
    assert b"Invalid Record Id" in response.data


# TODO: add more tests with invalid recids

def test_record_run_invalid_run_string(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/abc")
    assert response.status_code == 400
    assert b"Invalid Run Id" in response.data


def test_record_run_invalid_recid_string_numbers(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/123abc")
    assert response.status_code == 400
    assert b"Invalid Run Id" in response.data


def test_record_run_nonexistent_recid(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/45366")
    assert response.status_code == 400
    assert b"Invalid Run Id" in response.data


def test_record_run_negative_recid(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/-45366")
    assert response.status_code == 400
    assert b"Invalid Run Id" in response.data


def test_record_run_valid_recid(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674")
    assert response.status_code == 200
    # see ..
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
    assert isinstance(actual_data, list), 'Json is not a list %s' % type(actual_data)
    assert len(actual_data) == len(ref_list), 'Number of items in response does not match expected items'
    for actual in actual_data:
        assert isinstance(actual, numbers.Integral), 'Item in the json list is not a number'
        assert actual in ref_list, 'Item does not match'


# Test getting all runs within an event
# should return the collision events within said run

def test_run_event_invalid_event_string(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/198230/events/abc")
    assert response.status_code == 400
    assert b"Invalid Event Id" in response.data


def test_run_event_invalid_event_string_numbers(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/198230/events/123abc")
    assert response.status_code == 400
    assert b"Invalid Event Id" in response.data


def test_run_event_nonexistent_event(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/198230/events/45366")
    assert response.status_code == 400
    assert b"Invalid Event Id" in response.data


def test_run_event_negative_event(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/198230/events/-45366")
    assert response.status_code == 400
    assert b"Invalid Event Id" in response.data


def test_run_event_valid_event(client: FlaskClient) -> None:
    response: Response = client.get("/api/records/616/runs/167674/events/255488754")
    assert response.status_code == 200
    assert 'Types' in response.json['event']
    assert 'Collections' in response.json['event']
    assert 'Associations' in response.json['event']
