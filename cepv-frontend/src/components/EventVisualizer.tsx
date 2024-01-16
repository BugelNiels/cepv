import { Canvas } from '@react-three/fiber';
import React, { useRef, useState } from 'react'
import { ListGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Vector3 } from 'three';
import { Stats, OrbitControls } from '@react-three/drei'
import { useFetch } from '../util/useFetch';
import ViewInArIcon from '@mui/icons-material/ViewInAr';


interface MeshProps {
    position: Vector3 | Number[];
}

const EventVisualizer = () => {

    const { recid, runid, eventid } = useParams();

    const currentEvent = useFetch(`/api/records/${recid}/runs/${runid}/events/${eventid}`);
    console.log("event: ", currentEvent, `api/records/${recid}/runs/${runid}/events/${eventid}`);

    const Box = (props: MeshProps) => {
        // This reference gives us direct access to the THREE.Mesh object
        const ref = useRef()
        // Hold state for hovered and clicked events
        const [hovered, hover] = useState(false)
        const [clicked, click] = useState(false)
        // Return the view, these are regular Threejs elements expressed in JSX
        return (
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
            </mesh>
        )
    }

    const getEventSummary = () => {
        if (eventid == undefined) {
            return (<></>);
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Record: {recid?.toString()}</span>
                <span>Run: {runid?.toString()}</span>
                <span>Event: {eventid?.toString()}</span>
            </div>
        )
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-10 p-5">
                    <h2>
                        <ViewInArIcon fontSize='large'/> Event Visualizer
                    </h2>
                </div>
            </div>
            <div className="row h-75">
                <Canvas>
                    <color attach="background" args={[0, 0, 0]} />
                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                    <Box position={[-1.2, 0, 0]} />

                    <OrbitControls />

                    <axesHelper args={[1]} />
                </Canvas>
            </div>

            <div className="row p-5">
                {getEventSummary()}
            </div>
        </>
    )
}

export { EventVisualizer };
