import React from 'react';
import { EventVisualizer } from '../components/EventVisualizer';
import { EventList } from '../components/EventList';

function EventPage() {

  return (
    <>
      <div className="col-2 accent-comp shadow-sm rounded">
        <EventList />
      </div>
      <div className="col-10 p-4 d-flex flex-column">
        <EventVisualizer />
      </div>
    </>
  );
}

export { EventPage };
