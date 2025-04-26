import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "./assets/images/favicon.webp";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // Actualiza si cambia la ruta

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/dailyroutine", label: "DAILY TRAINING" },
    { path: "/profile", label: "PROFILE" },
    { path: "/sneakers", label: "SNEAKERS" },
    { path: "/improvement", label: "IMPROVEMENT" },
  ];

  return (
    <>
      <div className="flex h-32 "></div>

      <header className="fixed top-0 left-0 right-0 w-screen bg-white/10 backdrop-blur-md h-28 border-none overflow-y-hidden z-40">
        <div className="max-w-[1200px] mx-auto px-4 h-full ">
          <div className="flex items-center justify-between h-full">
            <Link className="flex items-center space-x-2 select-none" to="/">
              <div className="relative">
                <img
                  src={image || "/placeholder.svg"}
                  alt="logo"
                  className="h-36 w-auto max-w-[160px]"
                />
                <h2 className="absolute -translate-y-1/2 top-3/4 ml-2 text-white text-xs leading-tight whitespace-nowrap">
                  Basketball Improvement <br /> Checker &amp; Routine Maker
                </h2>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-white hover:text-gray-300 transition-colors relative px-3 py-2 rounded-full ${
                    location.pathname === item.path ? "bg-none" : ""
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gray-500 rounded-lg -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white px-4 py-2 rounded-lg hover:text-gray-300 transition"
                >
                  Log Out
                </button>
              ) : (
                <Link to="/login">
                  <button className="text-white px-4 py-2 rounded-lg hover:text-gray-300 transition">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-28 left-0 right-0 bg-white/10 backdrop-blur-md z-40 overflow-y-hidden"
          >
            <nav className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-white hover:text-gray-300 transition-colors px-3 py-2 rounded-lg ${
                    location.pathname === item.path ? "bg-gray-500" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4">
                <svg
                  className="h-5 w-5 text-white cursor-pointer hover:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-white px-4 py-2 rounded-lg hover:text-gray-300 transition"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="text-white px-4 py-2 rounded-lg hover:text-gray-300 transition">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
