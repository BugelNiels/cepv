import { useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../util/useFetch';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { LhcEvent } from '../types';
import { EnvironmentPreset, LhcCanvas } from './webgl/LhcCanvas';
import { ColliderPart, ColliderParts, defaultColliderParts } from '../data/ColliderParts';


const getEventSummary = (recId: string | undefined, runId: string | undefined, eventId: string | undefined) => {
    if (recId == undefined || runId == undefined || eventId == undefined) {
        return (<></>);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><Link to={`https://opendata.cern.ch/record/${recId}`}>Record: {recId}</Link></span>
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
    const [envPreset, setEnvPreset] = useState<EnvironmentPreset>("sunset");

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
            <>
                <b>Collider Parts:</b>
                <Form className='text-start'>
                    {checkBoxes}
                </Form>
            </>
        );
    }

    const EnvironmentDropdown = () => {

        return (
            <>
                <b>Lighting:</b>
                <Form className='text-start'>
                    <Form.Check
                        defaultChecked
                        name="envPreset"
                        type="radio"
                        key="sunset"
                        label="Default"
                        onChange={() => setEnvPreset("sunset")}
                    />
                    <Form.Check
                        name="envPreset"
                        type="radio"
                        key="studio"
                        label="Bright"
                        onChange={() => setEnvPreset("studio")}
                    />
                    <Form.Check
                        name="envPreset"
                        type="radio"
                        key="night"
                        label="Dark"
                        onChange={() => setEnvPreset("night")}
                    />
                </Form>
            </>
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
                    <LhcCanvas currentEvent={currentEvent} colliderPartsEnabled={colliderPartsEnabled} backgroundPreset={envPreset} />
                </div>
                <div className="col-2 text-start">
                    {CollidorVisList()}
                    <hr />
                    {EnvironmentDropdown()}
                </div>
            </div>

            <div className="row p-5">
                <div className="col-10">
                    {getEventSummary(recid, runid, eventid)}
                </div>
                <div className="col-2">
                </div>
            </div>
        </>
    )
}

export { EventVisualizer };
