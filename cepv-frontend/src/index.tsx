import React from 'react';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import { RecordPage } from './pages/RecordPage';
import { EventPage } from './pages/EventPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Footer } from './components/Footer';


// TODO: ensure proper nesting so that only parts are re-rendered
const router = createBrowserRouter(
  createRoutesFromElements(
    [
      <Route path="/" element={<RecordPage />} />,
      <Route
        path="/records/:recid/runs/:runid/events/:eventid"
        element={<EventPage />}
      />,
      <Route
        path="/records/:recid"
        element={<EventPage />}
      />
    ]
  ));


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <main className="main-container flex-column d-flex">
      <div className="container-fluid flex-grow-1 row m-0 p-0">
          <RouterProvider router={router} />
      </div>
      <Footer />
    </main>
  </React.StrictMode>
);
