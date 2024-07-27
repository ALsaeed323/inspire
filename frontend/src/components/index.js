import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';
import reportWebVitals from '../reportWebVitals';
import './assets/scss/style.scss'; // Ensure styles are imported
import Loader from '../../layouts/loader/Loader'; // Loader component for fallback

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);

reportWebVitals();
