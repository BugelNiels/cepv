import React from 'react';
import { RecordList } from '../components/RecordList';
import { HomeText } from '../components/HomeText';

function RecordPage() {

  return (
    <>
      <div className="col-4 accent-comp">
        <RecordList />
      </div>
      <div className="col-8">
        <HomeText />
      </div>
    </>
  );
}

export { RecordPage };
