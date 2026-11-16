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

  // ✅ Updated menu data with label + path for each dropdown item
  const menus = [
    {
      title: "PROGRAMS",
      path: "/programs/first-lego-league",
      items: [
        { label: "FIRST LEGO League", path: "/programs/first-lego-league" },
        { label: "FIRST Tech Challenge", path: "/programs/first-tech-challenge" },
        { label: "FIRST Robotics Competition", path: "/programs/first-robotics-competition" },
        
      ],
    },
    {
      title: "COMMUNITY",
      path: "/community/mentors",
      items: [
        { label: "Volunteer ", path: "/community/students" },
        { label: "Mentors", path: "/community/mentors" },
        { label: "Alumni", path: "/community/alumni" },
       
      ],
    },
    {
      title: "WAYS TO HELP",
      path: "/help/donate",
      items: [
        { label: "Donate", path: "/help/donate" },
        { label: "Contact us", path: "/help/contactus" },
        { label: "Sponsorship", path: "/help/sponsorship" },
      ],
    },
    {
      title: "ABOUT",
      path: "/about-first",
      items: [
        { label: "About First", path: "/about-first" },
        { label: "Leadership", path: "/leadership" },
        { label: "Support", path: "/Careers" },
      ],
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
        <div className="hidden lg:flex items-center space-x-6 font-semibold">
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
                  location.pathname.startsWith(menu.path)
                    ? "text-blue-600 font-bold"
                    : ""
                }`}
              >
                {menu.title}
              </Link>

              {/* Dropdown for Desktop */}
              <ul
                className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-300`}
              >
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 rounded-md transform hover:scale-105"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Link to="/kits-buy" aria-current={location.pathname === "/kits-buy" ? "page" : undefined} className={`whitespace-nowrap transition-colors hover:text-blue-600 ${location.pathname === "/kits-buy" ? "text-blue-600" : "text-gray-800"}`}>
            KITS BUY
          </Link>

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
        <div className="lg:hidden">
          <button aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
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

              {/* Dropdown for Mobile */}
              <ul
                className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                  dropdownOpen === menu.title ? "max-h-60" : "max-h-0"
                }`}
              >
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="block py-1 hover:text-blue-600 transition-all duration-300"
                      onClick={() => setMenuOpen(false)} // Close menu after click
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li>
            <Link to="/kits-buy" onClick={() => setMenuOpen(false)} aria-current={location.pathname === "/kits-buy" ? "page" : undefined} className="block py-2 text-blue-600">KITS BUY</Link>
          </li>

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
