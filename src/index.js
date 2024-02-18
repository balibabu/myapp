import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Test from './Test';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div style={{ fontFamily: 'Nunito, sans-serif' }}>
      <App />
      {/* <Test/> */}
    </div>
  </React.StrictMode>
);

reportWebVitals();
