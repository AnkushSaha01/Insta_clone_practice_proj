import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../shared/components/Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 h-screen overflow-y-auto">
        <div className="container h-full mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
