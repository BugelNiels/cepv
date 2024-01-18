import React, { useEffect, useState } from 'react'
import { ListGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useFetch } from '../util/useFetch';
import SearchIcon from '@mui/icons-material/Search';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AppsIcon from '@mui/icons-material/Apps';


interface LhcRecord {
    name: string;
    run: string;
    id: number;
}

interface RecordsData {
    records: LhcRecord[];
}

interface RunsData {
    runs: number[];
}


const RecordList = () => {
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    const allRecords: { result: RecordsData | null } = useFetch<RecordsData>('/api/records');


    // TODO: use useCallback for these methods
    const handleRecordListClick = (record: LhcRecord) => {
        return () => {
            navigate(`/records/${record.id}`);
        }
    }

    const getRecordItems = (lhcRecords: RecordsData | null) => {
        if (lhcRecords == null) {
            return;
        }
        return lhcRecords.records.filter((lhcRecord) => {
            return (lhcRecord.name).toLowerCase().includes(search.toLowerCase())
                || (lhcRecord.run).toLowerCase().includes(search.toLowerCase())
                || (lhcRecord.id).toString().includes(search.toLowerCase());
        }).map((lhcRecord: LhcRecord) => {
            // TODO: remove the nesting and conditionals here
            return (
                <ListGroup.Item key={lhcRecord.id.toString()} action onClick={handleRecordListClick(lhcRecord)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span><ScatterPlotIcon fontSize="small" /> {lhcRecord.name}</span>
                        <span style={{ color: 'var(--secondary-text)' }}>{lhcRecord.run}</span>
                    </div>
                </ListGroup.Item>
            )
        })
    }

    return (
        <div className='m-2'>
            <div className="row p-5">
                <h2><AppsIcon /> Records</h2>
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
            <div className="row">
                <ListGroup className="overflow-auto" style={{ maxHeight: '600px' }}>
                    {getRecordItems(allRecords?.result)}
                </ListGroup>
                <hr />
            </div>
        </div>
    )
}

export { RecordList };
