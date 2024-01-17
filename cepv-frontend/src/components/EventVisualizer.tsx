import { Canvas, ReactThreeFiber, extend } from '@react-three/fiber';
import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Stats, OrbitControls, Stage, Line } from '@react-three/drei'
import { useFetch } from '../util/useFetch';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { LhcEvent, TypeTracksV3 } from '../types';
import { LhcCanvas } from './webgl/LhcCanvas';
import { ColliderPart, ColliderParts, defaultColliderParts } from '../data/ColliderParts';


const getEventSummary = (recId: string | undefined, runId: string | undefined, eventId: string | undefined) => {
    if (recId == undefined || runId == undefined || eventId == undefined) {
        return (<></>);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Record: {recId}</span>
            <span>Run: {runId}</span>
            <span>Event: {eventId}</span>
        </div>
    )
}

const EventVisualizer = () => {

    const { recid, runid, eventid } = useParams();

    const currentEvent: { result: LhcEvent | null } = useFetch<LhcEvent | null>(`/api/records/${recid}/runs/${runid}/events/${eventid}`);
    // TODO: extract into separate file
    const [colliderPartsEnabled, setColliderPartsEnabled] = useState<ColliderParts>(defaultColliderParts);

    const handleCheckboxChange = (checkboxName: keyof ColliderParts) => {
        setColliderPartsEnabled((prevValues) => ({
            ...prevValues,
            [checkboxName]: {
                ...prevValues[checkboxName],
                enabled: !prevValues[checkboxName].enabled
            },
        }));
    };

    const CollidorVisList = () => {

        const checkBoxes = Object.entries(colliderPartsEnabled).map(([key, value]: [string, ColliderPart]) => {
            return (
                <Form.Check
                    type="switch"
                    key={value.name}
                    label={value.name}
                    checked={value.enabled}
                    onChange={() => handleCheckboxChange(key as keyof ColliderParts)}
                />
            )
        })

        return (
            <Form className='text-start'>
                {checkBoxes}
            </Form>
        );
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
                <div className="col-10">
                    <LhcCanvas currentEvent={currentEvent} colliderPartsEnabled={colliderPartsEnabled} />
                </div>
                <div className="col-2">
                    {CollidorVisList()}
                </div>
            </div>

            <div className="row p-5">
                {getEventSummary(recid, runid, eventid)}
            </div>
        </>
    )
}

export { EventVisualizer };
