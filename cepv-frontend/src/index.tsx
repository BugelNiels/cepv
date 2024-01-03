import React from 'react';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import { Footer } from './components/Footer';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/events/:eventId"
        element={<App />}
      />
    </Route>
  ));


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <main className="main-container flex-column d-flex">
      <div className="container-fluid flex-grow-1 row m-0 p-0">
        <div className="row m-0">
          <RouterProvider router={router} />
        </div>
      </div>
      <Footer />
    </main>
  </React.StrictMode>
);
