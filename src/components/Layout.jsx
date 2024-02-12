import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Topbar from './TopBar';

const Layout = () => (
  <div className="app">
    <NavBar />
    <main className="content">
      <Topbar />
      <Outlet />
    </main>

  </div>
);

export default Layout;
