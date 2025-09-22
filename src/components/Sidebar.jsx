import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaBars,
  FaUserShield,
  FaUserFriends,
  FaUserTie,
  FaCalendarAlt,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaTasks,
  FaChevronDown,
  FaChevronUp,
  FaUserCircle
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandEvents, setExpandEvents] = useState(true);
  const [expandUsers, setExpandUsers] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('✅ Logged out');
    navigate('/');
  };

  const eventsMenu = [
    { icon: <FaClipboardList />, label: 'New Requests', link: '/dashboard/new-requests' },
    { icon: <FaFileInvoiceDollar />, label: 'Estimate', link: '/dashboard/estimate' },
    { icon: <FaCalendarAlt />, label: 'Events', link: '/dashboard/events' },
    { icon: <FaTasks />, label: 'Partial Requests', link: '/dashboard/partial-requests' },
  ];

  const usersMenu = [
    { icon: <FaUserShield />, label: 'Admins', link: '/dashboard/admins' },
    { icon: <FaUserFriends />, label: 'Clients', link: '/dashboard/clients' },
    { icon: <FaUserTie />, label: 'Coordinators', link: '/dashboard/coordinators' },
  ];

  return (
    <div
      className={`h-screen bg-gradient-to-b from-black to-purple-900 p-4 text-white transition-all duration-300 relative border border-pink-500 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
      style={{ borderRadius: '20px 0 0 20px', boxShadow: '0 0 20px #ec4899' }}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <button onClick={toggleSidebar} className="text-pink-500 focus:outline-none">
          <FaBars size={20} />
        </button>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full border-2 border-pink-500 flex items-center justify-center">
          <span className="text-pink-400 font-bold text-xl">B</span>
        </div>
      </div>

      {/* Events Section */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-pink-400 font-bold px-2 py-1 hover:bg-pink-900 rounded-md text-base"
          onClick={() => setExpandEvents(!expandEvents)}
        >
          {isOpen && <span>Events</span>}
          {!isOpen && <FaCalendarAlt />}
          {isOpen && (expandEvents ? <FaChevronUp /> : <FaChevronDown />)}
        </button>
        {expandEvents && isOpen && (
          <ul className="mt-2 space-y-2 ml-4">
            {eventsMenu.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.link}
                  className="flex items-center gap-2 text-white hover:text-pink-400 text-base"
                >
                  <span className="text-pink-300">|___</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Static Links */}
      <ul className="text-white text-base space-y-2 ml-1 mb-4">
        {isOpen && <li className="hover:text-pink-400">Positions</li>}
        {isOpen && <li className="hover:text-pink-400">Contractors</li>}
      </ul>

      {/* Users Section */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-pink-400 font-bold px-2 py-1 hover:bg-pink-900 rounded-md text-base"
          onClick={() => setExpandUsers(!expandUsers)}
        >
          {isOpen && <span>Users</span>}
          {!isOpen && <FaUserFriends />}
          {isOpen && (expandUsers ? <FaChevronUp /> : <FaChevronDown />)}
        </button>
        {expandUsers && isOpen && (
          <ul className="mt-2 space-y-2 ml-4">
            {usersMenu.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.link}
                  className="flex items-center gap-2 text-white hover:text-pink-400 text-base"
                >
                  <span className="text-pink-300">|___</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Profile */}
      <div className="mb-20">
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 text-white hover:text-pink-400 text-base px-2 py-1"
        >
          <FaUserCircle />
          {isOpen && <span>Profile</span>}
        </Link>
      </div>

      {/* Logout */}
      <div className="absolute bottom-4 w-[90%] left-[5%]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-black text-white border border-pink-500 hover:bg-pink-500 hover:text-black transition rounded-lg px-4 py-2 text-base"
        >
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;