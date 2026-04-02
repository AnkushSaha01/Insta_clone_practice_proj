import React from 'react';
import { NavLink } from 'react-router';
import User from '../../features/users/pages/User';

const navItems = [
  { name: 'Home', icon: 'home', path: '/home' },
  { name: 'Search', icon: 'search', path: '/search' },
  { name: 'Explore', icon: 'explore', path: '/explore' },
  
  { name: 'Messages', icon: 'chat', path: '/messages' },
  { name: 'Notifications', icon: 'favorite', path: '/notifications' },
  { name: 'Create', icon: 'add_box', path: '/create' },
  { name: 'Profile', icon: 'person', path: '/profile' },
];

const Sidebar = () => {
  return (
    <nav className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-white shadow-[1px_0_0_0_rgba(0,0,0,0.05)] flex flex-col py-8 px-3 gap-y-1 z-50 transition-colors">
      {/* Brand Header */}
      <div className="text-4xl font-bold tracking-tighter text-black mb-10 px-3 cursor-pointer">
        Curator
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-y-1 grow">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-x-4 px-3 py-3 rounded-xl transition-all duration-200 ease-out hover:bg-neutral-100 scale-95 hover:scale-100 active:scale-95 text-black ${
                isActive ? 'font-semibold' : 'font-regular'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[26px] transition-transform group-hover:scale-110"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="text-[16px] tracking-tight text-black">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Secondary Bottom Nav */}
      <div className="mt-auto px-3">
        <a
          href="#"
          className="group flex items-center gap-x-4 px-3 py-3 rounded-xl transition-all duration-200 ease-out hover:bg-neutral-100 text-black font-regular mt-2"
        >
          <span className="material-symbols-outlined text-[26px] transition-transform group-hover:scale-110">menu</span>
          <span className="text-[16px] tracking-tight">More</span>
        </a>
        <User/>
      </div>
    </nav>
  );
};

export default Sidebar;
