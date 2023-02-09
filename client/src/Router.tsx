import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import Dashboard from '@features/Dashboard/Dashboard.component';
import App from './App';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>,
  ),
);

export default router;
