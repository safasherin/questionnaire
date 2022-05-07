import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import { ContextProvider } from './context/Context.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(

  <ContextProvider>
    <App />
  </ContextProvider>,

  document.getElementById('root')
);

reportWebVitals();
