import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import REACT_ROUTER from '@common/react-router.routes';

import Dashboard from '@features/Dashboard';
import App from './App';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path={REACT_ROUTER.BASE} element={<Navigate to={REACT_ROUTER.DASHBOARD} />} />
      <Route path={REACT_ROUTER.DASHBOARD} element={<Dashboard />} />
    </Route>,
  ),
);

export default router;
