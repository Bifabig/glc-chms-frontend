import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import {
  Avatar,
  Box, IconButton, Typography, useTheme,
} from '@mui/material';
import {
  AddOutlined,
  CalendarMonthOutlined,
  ChurchOutlined,
  EventOutlined,
  HomeOutlined,
  MenuOutlined,
  PeopleOutlined,
  Person2Outlined,
} from '@mui/icons-material';
import {
  Menu, MenuItem, Sidebar, sidebarClasses,
} from 'react-pro-sidebar';
// import styles from '../../styles/NavBar.module.css';
import { tokens } from '../../theme';
import Item from './Item';
// import 'react-pro-sidebar/dist/styles/';

const links = [
  { path: '/', text: 'Dashboard', icon: <HomeOutlined /> },
  { path: '/members', text: 'Members', icon: <Person2Outlined /> },
  { path: '/churches', text: 'Churches', icon: <ChurchOutlined /> },
  { path: '/teams', text: 'Teams', icon: <PeopleOutlined /> },
  { path: '/programs', text: 'Programs', icon: <EventOutlined /> },
  { path: '/calendar', text: 'Calendar', icon: <CalendarMonthOutlined /> },
  { path: '/signup', text: 'Add User', icon: <AddOutlined /> },
  { path: '/login', text: 'Account', icon: <Person2Outlined /> },
];

const NavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box>
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: `${colors.primary[400]} !important`,
          },
        }}
        style={{ height: '100%' }}
      >
        <Menu menuItemStyles={{
          button: ({ level, active }) => {
            // only apply styles on first level elements of the tree
            if (level === 0) {
              return {
                backgroundColor: 'transparent',
                ':hover': { color: '#868dfb', backgroundColor: 'transparent' },
                color: active ? '#6870fa' : colors.grey[100],
              };
            }
            return 1;
          },
        }}
        >

          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
          >
            {
          !isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography>
                GLC CHMS
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlined />
              </IconButton>
            </Box>
          )
        }
          </MenuItem>
          {
            !isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Avatar sx={{
                    width: '80px', height: '80px', cursor: 'pointer', borderRadius: '50%',
                  }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography variant="h4" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>Biftu</Typography>
                  <Typography variant="h6" color={colors.greenAccent[500]}>Admin</Typography>

                </Box>
              </Box>
            )
          }

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            {links.map((link) => (
              <Item
                key={link.text}
                title={link.text}
                to={link.path}
                icon={link.icon}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </Menu>

      </Sidebar>
    </Box>
  // <nav className={styles.navbar}>
  //   <div className={styles.logo}>
  //     <h1>GLC CHMS</h1>
  //     <h2>LOGO</h2>
  //   </div>
  //   <div>
  //     <ul className={styles.navItems}>
  //       {links.map((link) => (
  //         <li key={link.text}>
  //           <NavLink
  //             to={link.path}
  //             className={({ isActive }) => (isActive ? styles.active : styles.none)}
  //           >
  //             {link.text}
  //           </NavLink>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // </nav>
  );
};

export default NavBar;
