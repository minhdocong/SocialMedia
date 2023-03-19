import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/Headerhompage/Headerhompage';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;