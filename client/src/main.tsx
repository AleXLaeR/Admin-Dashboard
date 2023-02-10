import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import ReduxWrapper from '@src/ReduxWrapper';

import router from '@src/Router';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxWrapper>
      <RouterProvider router={router} />
    </ReduxWrapper>
  </React.StrictMode>,
);
