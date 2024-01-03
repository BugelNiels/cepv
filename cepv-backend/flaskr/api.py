import functools

from flask import (Blueprint)

bp = Blueprint('cern', __name__, url_prefix='/api')

@bp.route('/events')
def get_events():
    return 'events!'