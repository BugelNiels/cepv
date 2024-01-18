import React from 'react'
import { Badge } from 'react-bootstrap';

const HomeText = () => {

    return (
        <>
            <div className="row p-5" >
                <h1>CERN CMS Event Visualizer</h1>
            </div>
            <div className="row p-1 justify-content-center">
                <div className='col-8'>
                    <p className='text-start p-5'>
                        This website contains a simple visualization of events observed at the Compact Muon Solenoid (CMS) detector at CERN.
                        Before you ask "but isn't there already an event display for this data", the answer is yes. When I got the idea for the project I did not know that though, and I thought it would be still be a fun project to do.
                        Additionally, it is always nice to learn a bit about how these things work.
                        <br />
                        <br />
                        The website uses the CERN Open Data API to retrieve the displayable records. The visualization itself only displays the CMS detector itself and the tracks produced by the collision event. More might be added in the future.
                        CERN has a lot of data publically available, so check that out below!
                    </p>
                    <p className='text-center p-3'>
                        <button className='btn-modern' onClick={e => { }}> CERN Open Data Portal</button >
                    </p>
                    <img src="/cms_screenshot.png" className="w-75 rounded shadow m-5" alt="Responsive image" />
                    <h3>Built using</h3>
                    <p className='p-5' style={{ fontSize: "large" }}>
                        <Badge pill bg="primary p-2 m-3" style={{ backgroundColor: "#2f74c0" }}>Typescript</Badge>
                        <Badge pill bg="primary p-2 m-3" style={{ backgroundColor: "#346c9c" }}>Python</Badge>
                        <Badge pill bg="primary p-2 m-3" style={{ backgroundColor: "#1ba1cc" }}>React</Badge>
                        <Badge pill bg="primary p-2 m-3" style={{ backgroundColor: "#d93327" }}>Redis</Badge>
                        <Badge pill bg="primary p-2 m-3">Three.js</Badge>
                        <Badge pill bg="primary p-2 m-3" style={{ backgroundColor: "#2b9aee" }}>Docker</Badge>
                    </p>

                </div>
            </div>
        </>
    )
}

export { HomeText };
