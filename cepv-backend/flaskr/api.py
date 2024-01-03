import functools
import requests
import zipfile
import json
import io

from flask import (Blueprint)

bp = Blueprint('cern', __name__, url_prefix='/api')

@bp.route('/event')
def get_events():

    try:
        response = requests.get("https://opendata.cern.ch/record/7125/files/BJetPlusX_Run2012C_0.ig")

        if response.status_code == 200:
            zip_data = io.BytesIO(response.content)

            # Extract the contents of the ZIP file
            with zipfile.ZipFile(zip_data, 'r') as zip_ref:
                # Extract all contents to the current directory or specify a target directory
                file_names = zip_ref.namelist()

                # Convert the list to JSON
                json_response = json.dumps(file_names)
                return json_response

            # Now you can access the extracted files as needed
                
        else:
            print(f"Error: {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")


    return 'events!'