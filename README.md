<br />
<p align="center">
  <h1 align="center">CERN CMS Event Visualization</h1>

  <p align="center">
    A web application that visualizes particle trajectories of collision events in the CMS detector. 
  </p>
</p>

[![Built With](https://skillicons.dev/icons?i=ts,react,threejs,python,flask,docker)](https://skillicons.dev)

![stars](https://img.shields.io/github/stars/bugelniels/cepv.svg) ![watchers](https://img.shields.io/github/watchers/bugelniels/cepv.svg) ![license](https://img.shields.io/github/license/bugelniels/cepv.svg) ![follow](https://img.shields.io/github/followers/bugelniels.svg?style=social&label=Follow&maxAge=2592000)

## About the project

This website contains a simple visualization of events observed at the Compact Muon Solenoid (CMS) detector at CERN. For some time I wanted to a project with some sort of visualization component (perhaps WebGl based). When I found out that CERN has a ton of data publically available, that sparked my curiosity (naturally). As such, I decided to build this web application to visualize these collision events (because that must look pretty cool).

Before you ask "but isn't there already an event display for this data", the answer is yes. When I got the idea for the project I did not know that though, and I thought it would be still be a fun project to do. Additionally, it is always nice to learn a bit about how these things work.

The website uses the CERN Open Data API to retrieve the displayable records. The visualization itself only displays the CMS detector itself (with the option of enabling/disabling the various parts) and the tracks produced by the collision event. The project is still under development, so more features might be added in the future.

![Screenshot](/images/screenshot.png)

![Screenshot](/images/screenshotTracks.png)

## Built With

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Three.js](https://threejs.org/)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [HAProxy](https://www.haproxy.org/)

## Project Structure

![Project Diagram](/images/cepv_project_structure.drawio.png)

The front end makes a number of API requests to the back end to know which records/runs/events to display. As these requests in turn depend on the CERN API, this can make the website not as responsive as desired. To improve this, the API responses of the back end are cached using Redis. This can be done because the data will not change often and is not user-dependent, making all endpoints perfect for caching. This means that an initual request to a particular endpoint might take a small amount of time, but subsequent requests will be served from the cache.

## Running the website locally

Ensure that you have Docker and Docker-Compose on your machine before you start.

1. Start by cloning the repository:

    ```sh
    git clone https://github.com/BugelNiels/cepv.git
    ```

2. Start the docker containers:

    ```sh
    docker-compose up
    ```

3. Open your web browser and go to [localhost](http://localhost/).

It should be noted that at the moment only a development built is available. In the future, the web application will most likely receive a production build and be deployed somewhere.


## Running API tests

The tests for the back end API can be run as follows:

1. Navigate to the `cepv-backend` directory:
    ```sh
    cd cepv-backend
    ```
2. Create a python virtual environment:
    ```sh
    python3 -m venv venv
    ```
2. Activate the python virtual environment:
    ```sh
    . .venv/bin/activate
    ```
3. Install the necessary requirements:
    ```sh
    pip install -r requirements.txt
    ```
3. Run the tests:
    ```sh
    python3 -m pytest
    ```
  
It should be noted that the tests currently depend on the fact that the CERN api is up and running. This is of course not ideal and can be solved by mocking the CERN api interface, which should make a number of tests less dependent on this. I have not gotten around to this yet though, so this issue is still open.


## Useful links

The following are some resources I used while building the projects:

- [CMS Detector 3D Model](https://twiki.cern.ch/twiki/bin/view/CMSPublic/SketchUpCMS). The 3D model used in the visualzation. Separated and exported the mesh using Blender.
- [Tai Sakuma and Thomas McCauley 2014J. Phys.: Conf. Ser. 513 022032](https://arxiv.org/abs/1311.4942). Useful information on the detector layout.
- [Computing Methods in High-Energy Physics ](https://opendata.cern.ch/record/61). Contains information on some of the data processing aspects. 