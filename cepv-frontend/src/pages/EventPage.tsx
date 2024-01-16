import React from 'react';
import { EventVisualizer } from '../components/EventVisualizer';
import { EventList } from '../components/EventList';

function EventPage() {

  console.log("rendering");

  return (
    <>
      <div className="col-2 accent-comp">
        <EventList />
      </div>
      <div className="col-10 p-0">
        <EventVisualizer />
      </div>
    </>
  );
}

export { EventPage };
