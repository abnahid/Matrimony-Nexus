import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../assets/logo.svg";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "./../hooks/useAdmin";

const Navbar = () => {
  const { user, signOutUser, darkMode, toggleDarkMode } =
    useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const activeStyle = "font-semibold text-BgPrimary dark:text-BgPrimary";

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
              : "hover:text-gray-700 px-3 py-1 rounded-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/biodatas"
          className={({ isActive }) =>
            isActive
              ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
              : "hover:text-gray-700 px-3 py-1 rounded-lg"
          }
        >
          Biodatas
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
              : "hover:text-gray-700 px-3 py-1 rounded-lg"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
              : "hover:text-gray-700 px-3 py-1 rounded-lg"
          }
        >
          Contact Us
        </NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink
            to="/dashboard/adminHome"
            className={({ isActive }) =>
              isActive
                ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
                : "hover:text-gray-700 px-3 py-1 rounded-lg"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink
            to="/dashboard/userHome"
            className={({ isActive }) =>
              isActive
                ? `${activeStyle} hover:text-gray-700 px-3 py-1 rounded-lg`
                : "hover:text-gray-700 px-3 py-1 rounded-lg"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg dark:bg-gray-900"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-gray-500 rounded-lg focus:outline-none dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Menu className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="right" className="w-48">
              <ul className="space-y-2">{links}</ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Matrimony Nexus Logo" className="h-12" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="flex space-x-6">{links}</ul>
        </div>

        {/* User Profile Dropdown */}
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center p-1 text-gray-500 rounded-lg dark:text-gray-400 focus:outline-none">
                  <img
                    src={user?.photoURL || defaultProfilePicture}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.displayName || "User Name"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user?.email || "user@example.com"}
                  </p>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/up-coming-page" className="w-full text-left">
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/GotMarried" className="w-full text-left">
                    Write a Review
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button
                    onClick={signOutUser}
                    className="w-full text-left text-red-500"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-BgPrimary text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg border border-primary text-primary"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
