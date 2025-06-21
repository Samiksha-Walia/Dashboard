import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Kanban', path: '/kanban' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Table', path: '/table' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-lg h-screen p-6 flex flex-col justify-between">
      <div>
        {/* Clickable Admin Title */}
        <Link to="/" className="block mb-6 text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
          Admin
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <footer className="text-sm text-gray-400 dark:text-gray-500 text-center mt-10">
        © {new Date().getFullYear()} Admin Panel
      </footer>
    </aside>
  );
};

export default Sidebar;
