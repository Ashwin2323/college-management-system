import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">College Management</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
          <li><Link to="/register" className="hover:text-blue-400">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
