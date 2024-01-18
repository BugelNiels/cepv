import React from 'react';
import { RecordList } from '../components/RecordList';
import { HomeText } from '../components/HomeText';

function RecordPage() {

  return (
    <>
      <div className="col-3 accent-comp shadow-sm rounded">
        <RecordList />
      </div>
      <div className="col-9">
        <HomeText />
      </div>
    </>
  );
}

export { RecordPage };
