import React, { useState } from 'react'
import { ListGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';


const EventVisualizer = () => {

    const { eventId } = useParams();

    return (
        <>
        {eventId}
        </>
    )
}

export { EventVisualizer };
