import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';

import { useAppSelector } from '@redux/hooks';
import { useGetUserQuery } from '@redux/adminApi';
import { selectGlobalState } from '@redux/slices/global.slice';

import SideBar from './SideBar';
import NavBar from './NavBar';

export default function Layout() {
  const isMobile = useMediaQuery('(max-width): 600px');

  const { userId } = useAppSelector(selectGlobalState);
  const { data: user } = useGetUserQuery(userId);

  return (
    <Box display={isMobile ? 'block' : 'flex'} width="100%" height="100%">
      <SideBar user={user} isMobile={isMobile} drawerWidth="250px" />
      <Box flexGrow={1}>
        <NavBar user={user} />
        <Outlet />
      </Box>
    </Box>
  );
}
