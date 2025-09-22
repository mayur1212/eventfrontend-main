import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/footer-logo.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const location = useLocation();

  // Scroll effect for sticky background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const menus = [
    {
      title: "PROGRAMS",
      path: "/programs",
      items: [
        "FIRST LEGO League",
        "FIRST Tech Challenge",
        "FIRST Robotics Competition",
        "Youth Safety",
      ],
    },
    {
      title: "COMMUNITY",
      path: "/community",
      items: ["Students", "Mentors", "Alumni", "Partners"],
    },
    {
      title: "WAYS TO HELP",
      path: "/help",
      items: ["Donate", "Volunteer", "Sponsorship"],
    },
    {
      title: "ABOUT",
      path: "/about",
      items: ["Our Mission", "Leadership", "Careers"],
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-blue-200 py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-semibold">
          {menus.map((menu) => (
            <div
              key={menu.title}
              className="relative group cursor-pointer"
              onMouseEnter={() => setDropdownOpen(menu.title)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <Link
                to={menu.path}
                className={`text-gray-800 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 ${
                  location.pathname.startsWith(menu.path) ? "text-blue-600 font-bold" : ""
                }`}
              >
                {menu.title}
              </Link>

              <ul
                className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-300`}
              >
                {menu.items.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 rounded-md cursor-pointer transform hover:scale-105"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex space-x-4 ml-6">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-2 font-semibold bg-white shadow-md">
          {menus.map((menu) => (
            <li key={menu.title}>
              <button
                className="w-full text-left flex justify-between items-center py-2 transition-all duration-300 hover:text-blue-600"
                onClick={() => toggleDropdown(menu.title)}
              >
                {menu.title}
                <span
                  className={`ml-2 transition-opacity duration-300 ${
                    dropdownOpen === menu.title ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {dropdownOpen === menu.title ? "-" : "+"}
                </span>
              </button>
              <ul
                className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                  dropdownOpen === menu.title ? "max-h-60" : "max-h-0"
                }`}
              >
                {menu.items.map((item) => (
                  <li
                    key={item}
                    className="py-1 hover:text-blue-600 cursor-pointer transition-all duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 text-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-center hover:bg-blue-700 transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
