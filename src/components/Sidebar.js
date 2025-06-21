import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md h-full p-4">
      <h1 className="text-xl font-bold mb-4">Admin</h1>
      <ul className="space-y-2">
        <li><Link to="/" className="block hover:text-blue-500">Dashboard</Link></li>
        <li><Link to="/kanban" className="block hover:text-blue-500">Kanban</Link></li>
        <li><Link to="/calendar" className="block hover:text-blue-500">Calendar</Link></li>
        <li><Link to="/table" className="block hover:text-blue-500">Table</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;