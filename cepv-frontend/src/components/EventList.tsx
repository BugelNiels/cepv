import React, { useState } from 'react'
import { ListGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useFetch } from '../util/useFetch';

interface LhcEvent {
    name: string;
    id: string;
}

const EventList = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const result = useFetch('api/event')
    console.log(result)


    const handleListClick = (event: LhcEvent) => {
        return () => {
            navigate(`events/${event.id}`);
        }
    }

    const getEventItems = () => {

        const lhcEvents: LhcEvent[] = [{ name: "event1", id: "event1" }, { name: "event2", id: "event2" }];

        return lhcEvents.filter((lhcEvent) => {
            return (lhcEvent.name).toLowerCase().includes(search.toLowerCase());
        }).map((lhcEvent) => {
            return (
                <ListGroup.Item key={lhcEvent.id} action onClick={handleListClick(lhcEvent)}>
                    {lhcEvent.name}
                </ListGroup.Item>
            )
        }
        )
    }

    return (
        <>
            <div className="row justify-content-center flex-fill text-center p-2 pt-3" style={{ color: "white" }}>
                <InputGroup className="col-md-12 mt-2">
                    <InputGroup.Text>
                        {/* <SearchIcon fontSize="small" /> */}
                    </InputGroup.Text>
                    <FormControl autoFocus type="text" placeholder="Search..." onChange={(e) => { setSearch(e.target.value) }} />
                </InputGroup>
            </div>
            <hr />
            <div>
                <ListGroup>
                    {getEventItems()}
                </ListGroup>
                <hr />
            </div>
        </>
    )
}

export { EventList };

export type { LhcEvent };