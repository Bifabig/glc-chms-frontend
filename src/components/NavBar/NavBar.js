import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/NavBar.module.css';

const links = [
  { path: '/members', text: 'Members' },
  { path: '/churches', text: 'Churches' },
  { path: '/teams', text: 'Teams' },
  { path: '/programs', text: 'Programs' },
];

const NavBar = () => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>
      <h1>GLC CHMS</h1>
      <h2>LOGO</h2>
    </div>
    <div>
      <ul className={styles.navItems}>
        {links.map((link) => (
          <li key={link.text}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? styles.active : styles.none)}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h3>Logout</h3>
    </div>
  </nav>
);

export default NavBar;
