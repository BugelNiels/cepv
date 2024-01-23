import os

import pytest
import conftest
import requests
from requests import Response

from cepv_api import create_app


def test_config_testing_is_off_by_default():
    os.environ['CACHE_TYPE'] = 'RedisCache'
    os.environ['CACHE_REDIS_HOST'] = 'redis'
    os.environ['CACHE_REDIS_PORT'] = '6379'
    os.environ['CACHE_REDIS_DB'] = '0'
    os.environ['CACHE_REDIS_URL'] = 'redis://redis-dev:6379/0'
    os.environ['CACHE_DEFAULT_TIMEOUT'] = '500'
    assert not create_app().testing


def test_config_testing_is_on_with_config():
    assert create_app({'TESTING': True, "CACHE_TYPE": "NullCache"}).testing


def test_cern_api_is_up():
    response: Response = requests.get("https://opendata.cern.ch/api/records")
    assert response.status_code == 200, "CERN API server is down"
