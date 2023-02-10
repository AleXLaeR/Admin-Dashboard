import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search as SearchIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import ProfileImage from '@src/assets/profile-image.jpg';

import { useAppDispatch } from '@redux/hooks';
import { toggleTheme } from '@redux/slices/global.slice';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { setModal } from '@redux/slices/modal.slice';
import FlexBetween from '@common/components/FlexBetween';
import { AppUser } from '@src/typings';
import { useState, MouseEvent } from 'react';

interface NavBarProps {
  user?: AppUser;
}

export default function NavBar({ user }: NavBarProps) {
  const dispatch = useAppDispatch();
  const { palette } = useTheme() as any;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const onAnchorClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(currentTarget);
  };

  const onAnchorClose = () => {
    setAnchorEl(null);
  };

  const onThemeSwitcherClick = () => {
    dispatch(toggleTheme());
  };

  const onDrawerMenuClick = () => {
    dispatch(setModal(['sidebar']));
  };

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none', overflow: 'clip' }}>
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
          <FlexBetween>
            <Button
              onClick={onAnchorClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '1rem',
              }}
            >
              <Box
                component="img"
                // @ts-ignore
                alt="profile"
                src={ProfileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: palette.secondary[100] }}
                >
                  {user?.name ?? 'User'}
                </Typography>
                <Typography fontSize="0.75rem" sx={{ color: palette.secondary[200] }}>
                  {user?.occupation ?? 'Customer'}
                </Typography>
              </Box>
              <ArrowDropDownOutlined sx={{ color: palette.secondary[300], fontSize: '25px' }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={onAnchorClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <MenuItem onClick={onAnchorClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
