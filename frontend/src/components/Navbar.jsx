import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import icon from "../assets/favicon2.png";
import GoogleTranslate from "./GoogleTranslate";
import { FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth(); // Use context for isLoggedIn

  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setOpenDropdown(null);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  return (
    <nav ref={navbarRef} className="bg-gradient-to-r from-[#11cb46] via-green-600 to-[#04ba10] w-full z-50 top-0 fixed">
      <div className="flex flex-wrap items-center justify-between p-3 mx-auto font-semibold max-w-screen-2xl">
        {/* Logo and Brand */}
        <div className="flex items-center font-bold text-white">
          <Link to="/" onClick={closeMenu}>
            <img className="float-left" src={icon} alt="icon" style={{ height: "30px", width: "30px" }} />
            <span className="px-2 text-xl">AgroTech AI</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button onClick={toggleMenu} type="button" className="relative inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-100 rounded-lg lg:hidden hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-gray-200">
          <span className="sr-only">Open Menu</span>
          <div className="flex flex-col gap-1">
            <span className={`h-0.5 w-4 bg-white transform transition duration-200 ease-in ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`h-0.5 w-4 bg-white transition duration-200 ease-in ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`h-0.5 w-4 bg-white transform transition duration-200 ease-in ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </div>
        </button>

        {/* Navbar Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:flex lg:w-auto lg:items-center transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            {/* Home Link */}
            <NavLink to="/" end className={({ isActive }) => `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`} onClick={closeMenu}>
              Home
            </NavLink>

            {/* Crop Management Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdown("crop")}  onMouseLeave={closeMenu}> 
              <button onClick={() => handleDropdown("crop")}
                className="flex items-center px-3 py-2 text-white transition-all duration-300 rounded-lg hover:bg-green-500 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openDropdown === "crop" ? "true" : "false"}>
                Crop Management
                {/* <FaChevronDown className={`ml-1 transition-transform duration-200 ${openDropdown === "crop" ? "transform rotate-180" : ""}`} /> */}
              </button>
              {openDropdown === "crop" && (
                <div className="absolute left-0 z-50 mt-0 text-black bg-white rounded-lg shadow-lg w-60">
                  <NavLink to="/crop" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Crop Recommendation</NavLink>
                  <NavLink to="/crop_recommendation" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Crop Rotation Recommendation</NavLink>
                  <NavLink to="/prices" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Crop Price Prediction</NavLink>
                </div>
              )}
            </div>
            <NavLink to="/water-management" exact className={({ isActive }) => `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`} onClick={closeMenu}>
              Water Management
            </NavLink>
            {/* Soil & Fertilizer Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdown("soil")}  onMouseLeave={closeMenu}>
              <button onClick={() => handleDropdown("soil")} className="flex items-center px-3 py-2 text-white transition-all duration-300 rounded-lg hover:bg-green-500 focus:outline-none" aria-haspopup="true" aria-expanded={openDropdown === "soil" ? "true" : "false"}>
                Soil & Fertilizer
                {/* <FaChevronDown className={`ml-1 transition-transform duration-200 ${openDropdown === "soil" ? "transform rotate-180" : ""}`} /> */}
              </button>
              {openDropdown === "soil" && (
                <div className="absolute left-0 z-50 mt-0 text-black bg-white rounded-lg shadow-lg w-60">
                  <NavLink to="/fertilizer" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Fertilizer Prediction</NavLink>
                  <NavLink to="/soil" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Soil Quality Prediction</NavLink>
                </div>
              )}
            </div>

            {/* Other Links */}
            <NavLink to="/disease" className={({ isActive }) => `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`} onClick={closeMenu}>Disease Detection</NavLink>
            {/* <NavLink to="/climate" className={({ isActive }) => `block py-2 px-3 text-white rounded-lg transition-all duration-300 ${isActive ? "bg-green-700" : "hover:bg-green-500"}`} onClick={closeMenu}>Climate</NavLink> */}

            {/* Help Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdown("tools")}  onMouseLeave={closeMenu} >
              <button onClick={() => handleDropdown("tools")} className="flex items-center px-3 py-2 text-white transition-all duration-300 rounded-lg hover:bg-green-500 focus:outline-none" aria-haspopup="true" aria-expanded={openDropdown === "tools" ? "true" : "false"}>
                Tools
                {/* <FaChevronDown className={`ml-1 transition-transform duration-200 ${openDropdown === "tools" ? "transform rotate-180" : ""}`} /> */}
              </button>
              {openDropdown === "tools" && (
                <div className="absolute left-0 z-50 mt-0 text-black bg-white rounded-lg shadow-lg w-60">
                  <NavLink to="/PlantTaskReminder" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Plant Task Reminder</NavLink>
                  <NavLink to="/TaskReminder" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Plant Task Reminder Advanced</NavLink>
                  <NavLink to="/GeminiChat" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Gemini Chat</NavLink>
                </div>
              )}
            </div>
              

            {/* Help Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdown("help")} onMouseLeave={closeMenu}>
              <button onClick={() => handleDropdown("help")} className="flex items-center px-3 py-2 text-white transition-all duration-300 rounded-lg hover:bg-green-500 focus:outline-none" aria-haspopup="true" aria-expanded={openDropdown === "help" ? "true" : "false"}>
                Help
                {/* <FaChevronDown className={`ml-1 transition-transform duration-200 ${openDropdown === "help" ? "transform rotate-180" : ""}`} /> */}
              </button>
              {openDropdown === "help" && (
                <div className="absolute left-0 z-50 mt-0 text-black bg-white rounded-lg shadow-lg w-60">
                  <NavLink to="/Climate" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Climate</NavLink>
                  <NavLink to="/news" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>News</NavLink>
                  <NavLink to="/soiltestingcentres" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Soil Testing Centers</NavLink>
                  <NavLink to="/ee-shops" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Electrical and Electronics Shops</NavLink>

                
                  <NavLink to="/BestPractices" className="block px-4 py-2 hover:bg-gray-200" onClick={closeMenu}>Best Practices</NavLink>
                </div>
              )}
            </div>

            {/* Google Translate Component */}
            <GoogleTranslate />

            {/* Theme Toggle Button
            <button onClick={toggleTheme} className="items-center justify-center hidden p-2 ml-auto text-white transition duration-300 rounded-lg lg:flex hover:bg-green-500">
              {theme === "light" ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
            </button> */}

            {/* Authentication Links */}
            {isLoggedIn ? (
              <>
                {/* <Link to="/profile" className="px-3 py-2 text-white transition-all duration-300 rounded-lg hover:bg-blue-500">
                  Profile
                </Link> */}
                <button onClick={logout} className="px-3 py-2 text-white transition-all duration-300 rounded-lg hover:bg-red-500">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <span className="px-3 py-2 text-white transition-all duration-300 rounded-lg hover:bg-green-500">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
