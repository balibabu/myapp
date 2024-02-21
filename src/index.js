import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div style={{ fontFamily: 'Nunito, sans-serif' }}>
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();
