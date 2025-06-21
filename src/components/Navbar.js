import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <button
        onClick={toggleTheme}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;