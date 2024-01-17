import { useState } from 'react'
import { ListGroup, FormControl, InputGroup } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from '../util/useFetch';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HdrStrongIcon from '@mui/icons-material/HdrStrong';

interface LhcRun {
    id: number;
    directory: string;
    events: number[];
}

interface RunsData {
    recId: String;
    recName: String;
    runs: LhcRun[];
}

const EventList = () => {
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    const { recid } = useParams();

    const allEvents: { result: RunsData | null } = useFetch<RunsData>(`/api/records/${recid}`);

    const handleEventListClick = (runId: number, eventId: number) => {
        return () => {
            navigate(`/records/${recid}/runs/${runId}/events/${eventId}`);
        }
    }


    const getEventItems = (lhcRuns: RunsData | null) => {
        if (lhcRuns == null) {
            return;
        }
        return lhcRuns.runs.map((run: LhcRun) => {
            const eventItems = run.events.filter((eventId: number) => {
                return (eventId.toString().includes(search.toLowerCase()));
            }).map((eventId: number) => {
                return (
                    <ListGroup.Item key={eventId.toString()} action onClick={handleEventListClick(run.id, eventId)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span><HdrStrongIcon fontSize="small" /> Event {eventId.toString()}</span>
                        </div>
                    </ListGroup.Item>
                )
            })
            return (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4>Run {run.id.toString()}:</h4>
                        <span style={{ color: 'var(--secondary-text)' }}>Events: {eventItems.length} </span>
                    </div>
                    <ListGroup className="overflow-auto" style={{ maxHeight: '400px' }}>
                        {eventItems}
                    </ListGroup >
                    <hr />
                </>
            )
        }
        )
    }
    // TODO: record name

    return (
        <>
            <div className="row p-4">
                <button className='btn-modern' onClick={e => navigate("/")}><ArrowBackIcon fontSize="small" /> Back to Record Overview</button >
            </div>
            <div className="row p-2">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{allEvents?.result?.recName}</h2>
                    <span style={{ color: 'var(--secondary-text)' }}>ID: {recid} </span>
                </div>
            </div>
            <div className="row p-2 pt-3">
                <InputGroup className="col-md-12 mt-2">
                    <InputGroup.Text>
                        <SearchIcon fontSize="small" />
                    </InputGroup.Text>
                    <FormControl autoFocus type="text" placeholder="Search..." onChange={(e) => { setSearch(e.target.value) }} />
                </InputGroup>
            </div>
            <hr />
            <div className='text-start'>
                {getEventItems(allEvents?.result)}
            </div>
        </>
    )
}

export { EventList };
