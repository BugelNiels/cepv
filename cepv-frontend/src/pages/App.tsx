import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { EventList, LhcEvent } from '../components/EventList';
import { EventVisualizer } from '../components/EventVisualizer';

function App() {

  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <EventList />
      </div>
      <div className="col-8">
        <EventVisualizer />
      </div>
    </div>
  );
}

export default App;
