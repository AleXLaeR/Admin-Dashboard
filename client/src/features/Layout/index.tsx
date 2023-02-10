import { Outlet } from 'react-router-dom';

import { Box, useMediaQuery } from '@mui/material';
import NavBar from './NavBar';
import SideBar from './SideBar';

export default function Layout() {
  const isDesktop = useMediaQuery('(min-width): 600px');

  return (
    <Box display={isDesktop ? 'block' : 'flex'} width="100%" height="100%">
      <SideBar isMobile={!isDesktop} drawerWidth="250px" />
      <Box flexGrow={1}>
        <NavBar />
        <Outlet />
      </Box>
    </Box>
  );
}
