import { Canvas, ReactThreeFiber, extend } from '@react-three/fiber';
import React, { useRef, useState } from 'react'
import { ListGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Stats, OrbitControls, Stage, Line } from '@react-three/drei'
import { useFetch } from '../util/useFetch';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { LhcEvent, TypeTracksV3 } from '../types';
import { LhcCanvas } from './webgl/LhcCanvas';



const EventVisualizer = () => {

    const { recid, runid, eventid } = useParams();

    const currentEvent: { result: LhcEvent | null } = useFetch<LhcEvent | null>(`/api/records/${recid}/runs/${runid}/events/${eventid}`);


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
                        <ViewInArIcon fontSize='large' /> Event Visualizer
                    </h2>
                </div>
            </div>
            <div className="row h-75">
                <LhcCanvas {...currentEvent}/>
            </div>

            <div className="row p-5">
                {getEventSummary()}
            </div>
        </>
    )
}

export { EventVisualizer };
