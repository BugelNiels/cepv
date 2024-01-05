import functools
import numbers
import requests
import zipfile
import json
import io
import subprocess

from flask import (Blueprint)

bp = Blueprint('api', __name__, url_prefix='/api')

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

# TODO: write unit tests first

@bp.route('/events/<recid>')
def event_data(recid):

    if recid.isdigit():
        try:
            response = requests.get("https://opendata.cern.ch/api/records/" + recid)
            event_summary = response.json()

            event_data_res = requests.get("https://opendata.cern.ch/record/" + recid + "/files/" + event_summary["metadata"]["files"][0]["key"])

            if event_data_res.status_code == 200:
                zip_data = io.BytesIO(event_data_res.content)

                # Extract the contents of the ZIP file
                with zipfile.ZipFile(zip_data, 'r') as zip_ref:
                    # Extract all contents to the current directory or specify a target directory
                    file_names = zip_ref.namelist()

                    # Convert the list to JSON
                    json_response = json.dumps(file_names)
                    return json_response

            return response.content

        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")


    return 'something wrong'

@bp.route('/events/<recid>/run/<runid>/event/<runrecid>')
def event_run(recid, runid, runrecid):

    if recid.isdigit():
        try:
            response = requests.get("https://opendata.cern.ch/api/records/" + recid)
            event_summary = response.json()

            event_data_res = requests.get("https://opendata.cern.ch/record/" + recid + "/files/" + event_summary["metadata"]["files"][0]["key"])

            if event_data_res.status_code == 200:
                zip_data = io.BytesIO(event_data_res.content)

                # Extract the contents of the ZIP file
                with zipfile.ZipFile(zip_data, 'r') as zip_ref:

                    run_name = "Events/Run_" + runrecid + "/Event_" + runrecid

                    if runid in zip_ref.namelist():
                        # Read the contents of the file into a variable
                        with zip_ref.open(runid) as file:
                            content = file.read().decode('utf-8')  # Assume it's plain text; adjust decoding as needed
                            print(content)
                            # Convert the list to JSON
                            json_response = json.dumps(content)
                            return json_response

            return response.content

        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")


    return 'something wrong'