import os

from flask import Flask

from cepv_api.cache import cache


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        print("Production - Caching Enabled")
        # load the instance config, if it exists, when not testing
        # TODO: extract to file
        app.config.from_mapping(
            DEBUG=True,
            CACHE_TYPE=os.environ['CACHE_TYPE'],
            CACHE_REDIS_HOST=os.environ['CACHE_REDIS_HOST'],
            CACHE_REDIS_PORT=os.environ['CACHE_REDIS_PORT'],
            CACHE_REDIS_DB=os.environ['CACHE_REDIS_DB'],
            CACHE_REDIS_URL=os.environ['CACHE_REDIS_URL'],
            CACHE_DEFAULT_TIMEOUT=os.environ['CACHE_DEFAULT_TIMEOUT']
        )
    else:
        print("Testing - Caching Disabled")
        # load the test config if passed in
        app.config.from_mapping(test_config)

    cache.init_app(app)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import routes
    app.register_blueprint(routes.bp)

    return app
