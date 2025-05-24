import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <div>
        <Link
          to={user ? "/home" : "/"}
          className="font-bold text-2xl hover:text-gray-200">
          EduVideoTrack
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="font-semibold">Hello, {user.username}</span>
            <Link to="/home" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/video" className="hover:text-gray-300">
              Lecture
            </Link>
            {user.isAdmin && (
              <Link to="/admin" className="hover:text-gray-300">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 font-semibold transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
