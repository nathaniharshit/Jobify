import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const NavItems = [
    { path: "/jobs", title: "Search" },
    { path: "/add-job", title: "Post a Job" },
    { path: "/applied-jobs", title: "Applied jobs" },
  ];

  const userDataString = localStorage.getItem("auth");
  const name = userDataString ? JSON.parse(userDataString).user.name : null;

  return (
    <header className="flex items-center justify-between py-4 px-8 bg-gradient-to-r from-white via-gray-100 to-white shadow-lg sticky top-0 z-50 w-full border-b-2 border-gray-200">
      <NavLink
        to="/"
        className="text-3xl font-bold text-indigo-600 transition-transform transform hover:scale-105"
      >
        JobiFy
      </NavLink>
      <nav>
        <ul className="flex space-x-8 list-none m-0 p-0">
          {NavItems.map(({ path, title }) => (
            <li key={path} className="nav-item">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                    : "text-gray-700 hover:text-indigo-600 transition-colors"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-6">
        {userDataString && (
          <Link
            to="/my-jobs"
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Posted jobs
          </Link>
        )}
        <div className="flex items-center space-x-4">
          {userDataString ? (
            <>
              <span className="text-gray-700 font-medium">{name}</span>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-transform transform hover:scale-105"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-gray-700 hover:text-indigo-600 transition-colors"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="text-gray-700 hover:text-indigo-600 transition-colors"
                to="/signup"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
