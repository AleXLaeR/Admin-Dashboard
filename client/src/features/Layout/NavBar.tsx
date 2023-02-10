import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
} from '@mui/icons-material';
import ProfileImage from '@assets/profile-image.jpg';

import { useAppDispatch } from '@redux/hooks';
import { toggle } from '@redux/slices/theme.slice';
import { AppBar, Box, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import { setModal } from '@redux/slices/modal.slice';
import FlexBetween from '@common/components/FlexBetween';

export default function NavBar() {
  const dispatch = useAppDispatch();
  const { palette } = useTheme();

  const onThemeSwitcherClick = () => {
    dispatch(toggle);
  };

  const onDrawerMenuClick = () => {
    dispatch(setModal(['sidebar']));
  };

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <FlexBetween>
          <IconButton onClick={onDrawerMenuClick}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            // @ts-ignore
            backgroundColor={palette.background.paper}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween gap="1.5rem">
          <IconButton onClick={onThemeSwitcherClick}>
            {palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '1.5rem' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '1.5rem' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
