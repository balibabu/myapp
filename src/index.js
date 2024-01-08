import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div style={{ fontFamily: 'Nunito, sans-serif' }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
      </style>
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();
