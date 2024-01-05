import pytest

from cepv_api import create_app

def test_event_data(client):
    response = client.get("/api/events/abc")
    assert b"something wrong" in response.data