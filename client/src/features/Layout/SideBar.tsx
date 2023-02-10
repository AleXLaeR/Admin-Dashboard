import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { selectModalState, setModal } from '@redux/slices/modal.slice';

import {
  Box,
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
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import FlexBetween from '@common/components/FlexBetween';

interface SideBarProps {
  isMobile: boolean;
  drawerWidth?: number | string;
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

export default function SideBar({ isMobile, drawerWidth = 200 }: SideBarProps) {
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
                      <Typography sx={{ m: '2.25rem 0 1rem 3rem' }}>{heading}</Typography>
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
                              : undefined,
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
        </Drawer>
      )}
    </Box>
  );
}
