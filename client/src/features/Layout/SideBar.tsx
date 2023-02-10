import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { selectModalState, setModal } from '@redux/slices/modal.slice';

import ProfileImage from '@src/assets/profile-image.jpg';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import FlexBetween from '@common/components/FlexBetween';
import { AppUser } from '@src/typings';

interface SideBarProps {
  isMobile: boolean;
  drawerWidth?: number | string;
  user?: AppUser;
}

type NavItem = {
  heading: string;
  icon?: JSX.Element;
};

const navItems: NavItem[] = [
  {
    heading: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    heading: 'Client Facing',
  },
  {
    heading: 'Products',
    icon: <ShoppingCartOutlined />,
  },
  {
    heading: 'Customers',
    icon: <Groups2Outlined />,
  },
  {
    heading: 'Transactions',
    icon: <ReceiptLongOutlined />,
  },
  {
    heading: 'Geography',
    icon: <PublicOutlined />,
  },
  {
    heading: 'Sales',
  },
  {
    heading: 'Overview',
    icon: <PointOfSaleOutlined />,
  },
  {
    heading: 'Daily',
    icon: <TodayOutlined />,
  },
  {
    heading: 'Monthly',
    icon: <CalendarMonthOutlined />,
  },
  {
    heading: 'Breakdown',
    icon: <PieChartOutlined />,
  },
  {
    heading: 'Management',
  },
  {
    heading: 'Admin',
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    heading: 'Performance',
    icon: <TrendingUpOutlined />,
  },
];

export default function SideBar({ isMobile, drawerWidth = 200, user }: SideBarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { palette } = useTheme() as any;
  const [activeTab, setActiveTab] = useState('');

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectModalState);

  useEffect(() => setActiveTab(pathname.split('/')[1]), []);

  const onDrawerClose = () => {
    dispatch(setModal(['sidebar', false]));
  };

  const onMobileDrawerClick = () => {
    dispatch(setModal(['sidebar']));
  };

  const onTabItemClick = (tabName: string) => {
    navigate(`/${tabName}`);
    setActiveTab(activeTab);
  };

  return (
    <Box component="nav">
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={onDrawerClose}
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              color: palette.secondary[200],
              backgroundColor: palette.background.paper,
              boxSizing: 'border-box',
              borderRight: isMobile ? '1px outset aliceblue' : 0,
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={palette.secondary.main} gap="0.75rem">
                <Box className="flex-center gap-6">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {isMobile && (
                  <IconButton onClick={onMobileDrawerClick}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ heading, icon }) => {
                const lcHeading = heading.toLocaleLowerCase();
                const isCurTabActive = activeTab === lcHeading;

                return (
                  <Fragment key={heading}>
                    {!icon ? (
                      <Typography
                        sx={{
                          m: '2.25rem 0 .5rem 3rem',
                          fontSize: '1rem',
                          textDecoration: 'underline',
                          textUnderlineOffset: '5px',
                        }}
                      >
                        {heading}
                      </Typography>
                    ) : (
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{
                            backgroundColor: isCurTabActive
                              ? palette.secondary[400]
                              : 'transparent',
                            color: isCurTabActive ? palette.primary[600] : palette.secondary[100],
                            '&:hover': isCurTabActive
                              ? { backgroundColor: palette.secondary[500] }
                              : { textDecoration: 'underline' },
                          }}
                          onClick={() => onTabItemClick(lcHeading)}
                        >
                          <ListItemIcon
                            sx={{
                              ml: '2rem',
                              color: isCurTabActive ? palette.primary[600] : palette.secondary[200],
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={heading} />
                          {isCurTabActive && <ChevronRightOutlined sx={{ ml: 'auto' }} />}
                        </ListItemButton>
                      </ListItem>
                    )}
                  </Fragment>
                );
              })}
            </List>
          </Box>
          <Box position="absolute" bottom="0">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2.25rem 3rem">
              <Box
                component="img"
                // @ts-ignore
                alt="profile"
                src={ProfileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign="left" marginLeft="0.5rem">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: palette.secondary[100] }}
                >
                  {user?.name ?? 'User'}
                </Typography>
                <Typography fontSize="0.8rem" sx={{ color: palette.secondary[200] }}>
                  {user?.occupation ?? 'Customer'}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: palette.secondary[300], fontSize: '1.5rem', marginLeft: '0.5rem' }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
