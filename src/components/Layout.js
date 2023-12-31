import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

const Layout = () => (
  <div className="wrapper">
    <NavBar />
    <Outlet />
  </div>
);

export default Layout;
