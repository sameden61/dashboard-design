import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Percent as PercentIcon,
  ShowChart as ShowChartIcon,
  CompareArrows as CompareArrowsIcon,
  TableChart as TableChartIcon,
  BarChart as BarChartIcon,
  Book as BookIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    // Dashboard
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    
    // Values Group
    { text: 'Values', icon: <AnalyticsIcon />, path: null, isGroup: true },
    { text: 'Forward Values', icon: <TableChartIcon />, path: '/values', isGroup: true },
    { text: 'Current Metrics', icon: <BarChartIcon />, path: '/current-metrics', isGroup: true },
    { text: 'Metric Benchmarks', icon: <CompareArrowsIcon />, path: '/benchmarks', isGroup: true },
    { text: 'Consensus Values', icon: <BarChartIcon />, path: '/consensus-values', isGroup: true },
    
    // Multiples Group
    { text: 'Multiples', icon: <AnalyticsIcon />, path: null, isGroup: true },
    { text: 'Multiples Summary', icon: <AssessmentIcon />, path: '/multiples-summary', isGroup: true },
    { text: 'Percentile Check', icon: <PercentIcon />, path: '/percentile-check', isGroup: true },
    { text: 'Market Multiple', icon: <TrendingUpIcon />, path: '/market-multiple', isGroup: true },
    { text: 'Valuation Sensitivity', icon: <ShowChartIcon />, path: '/valuation-sensitivity', isGroup: true },
    
    // Case Studies
    { text: 'Case Studies', icon: <BookIcon />, path: '/case-studies' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ minHeight: 48 }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontSize: '1rem' }}>
          Portfolio Manager
        </Typography>
      </Toolbar>
      <List sx={{ py: 0 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            {index > 0 && item.isGroup && menuItems[index - 1].isGroup && (
              <Divider sx={{ my: 0.5 }} />
            )}
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  if (item.path) {
                    navigate(item.path);
                    if (isMobile) {
                      setMobileOpen(false);
                    }
                  }
                }}
                sx={{
                  pl: item.isGroup ? (item.path === null ? 1.5 : 3) : 1.5,
                  py: 0.75,
                  ...(item.path === null && {
                    backgroundColor: 'action.hover',
                    pointerEvents: 'none',
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                  }),
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: item.path === null ? 32 : 40,
                  color: item.path === null ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: item.path === null ? 'bold' : 'normal',
                    color: item.path === null ? 'primary.main' : 'inherit',
                    fontSize: item.path === null ? '0.85rem' : '0.875rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ minHeight: 48 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontSize: '1rem' }}>
            {menuItems.find((item) => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ minHeight: 48 }} />
        {children}
      </Box>
    </Box>
  );
} 