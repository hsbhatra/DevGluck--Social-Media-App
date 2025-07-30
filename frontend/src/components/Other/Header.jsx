import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (route)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="lg:p-5 w-full flex flex-col sm:flex-row justify-between  bg-gray-100 shadow-md">
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="sm:hidden text-blue-500 focus:outline-none"
        >
          ☰
        </button>

        <NavLink to="/">
          <img
            src="https://i0.wp.com/picjumbo.com/wp-content/uploads/silhouette-of-a-guy-with-a-cap-at-red-sky-sunset-free-image.jpeg?h=800&quality=80"
            alt="Logo"
            className="h-8 w-auto" // Adjust the size as needed
          />
        </NavLink>
      </div>

      {/* Centered menu items (visible on larger screens) */}
      <div className="flex gap-5">
        <NavLink
          to="/"
          className="text-blue-400 font-semibold hover:text-blue-600 hidden sm:block"
          exact
        >
          Home
        </NavLink>
        <NavLink
          to="/"
          className="text-blue-400 font-semibold hover:text-blue-600 hidden sm:block"
          exact
        >
          Roadmaps
        </NavLink>
        <NavLink
          to="/"
          className="text-blue-400 font-semibold hover:text-blue-600 hidden sm:block"
          exact
        >
          About Us
        </NavLink>
        <NavLink
          to="/"
          className="text-blue-400 font-semibold hover:text-blue-600 hidden sm:block"
          exact
        >
          Feedback
        </NavLink>
      </div>

      {/* Right section with Login button */}
      <div className="flex items-center gap-4">
        {!isAuthPage && !isMenuOpen && (
          <button
            onClick={handleLoginClick}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu (appears only when menu button is clicked) */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col gap-4 mt-2 bg-gray-50 p-4 rounded-lg shadow-md absolute left-0 right-0 top-16 z-10">
          {/* Menu items inside the mobile menu */}
          <NavLink
            to="/"
            className="text-blue-400 font-semibold hover:text-blue-600"
            exact
          >
            Home
          </NavLink>
          <NavLink
            to="/"
            className="text-blue-400 font-semibold hover:text-blue-600"
            exact
          >
            Roadmaps
          </NavLink>
          <NavLink
            to="/"
            className="text-blue-400 font-semibold hover:text-blue-600"
            exact
          >
            About Us
          </NavLink>
          <NavLink
            to="/"
            className="text-blue-400 font-semibold hover:text-blue-600"
            exact
          >
            Feedback
          </NavLink>

          {/* Optionally, you can add a login button in the mobile menu */}
          {!isAuthPage && (
            <button
              onClick={handleLoginClick}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
