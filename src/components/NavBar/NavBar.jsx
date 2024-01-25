import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import {
  Avatar,
  Box, IconButton, Typography, useTheme,
} from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import {
  Menu, MenuItem, Sidebar,
} from 'react-pro-sidebar';
// import styles from '../../styles/NavBar.module.css';
import { tokens } from '../../theme';
// import 'react-pro-sidebar/dist/styles/';

// const links = [
//   { path: '/members', text: 'Members' },
//   { path: '/churches', text: 'Churches' },
//   { path: '/teams', text: 'Teams' },
//   { path: '/programs', text: 'Programs' },
//   { path: '/calendar', text: 'Calendar' },
//   { path: '/signup', text: 'Add User' },
//   { path: '/login', text: 'Account' },
// ];

const NavBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);

  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [selected, setSelected] = useState('Dashboard');

  return (
    <Box>
      <Sidebar>
        <Menu>

          <MenuItem>
            {
          !isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography>
                Admins
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
                    width: '100px', height: '100px', cursor: 'pointer', borderRadius: '50%',
                  }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>Biftu</Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>Admin</Typography>

                </Box>
              </Box>
            )
          }
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
