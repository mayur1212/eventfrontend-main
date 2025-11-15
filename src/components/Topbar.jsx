import React, { useState, useRef, useEffect, useContext } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser, loading: userLoading, logout } = useContext(UserContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Optional: keep context in sync if localStorage changed (extra safety)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user" || e.key === "user_updated_at") {
        const saved = localStorage.getItem("user");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            // update context if different
            if (!user || parsed?.profileImg !== user.profileImg) {
              setUser(parsed);
            }
          } catch {
            // ignore
          }
        } else {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [setUser, user]);

  const handleLogout = () => {
    // call context logout if provided
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-md">
      <h1 className="text-2xl font-bold text-pink-400 tracking-wide">Event Requests</h1>

      <div className="flex items-center gap-4 relative">
        <div className="flex items-center bg-purple-800 hover:bg-purple-700 rounded-full px-4 py-1 shadow-inner transition duration-300">
          <FaSearch className="mr-2 text-pink-400" />
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent outline-none text-sm text-white placeholder:text-gray-300 w-40"
          />
        </div>

        <button
          className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-md"
          title="Add New"
        >
          <FaPlus />
        </button>

        <div className="relative" ref={dropdownRef}>
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-400 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            title="Profile Menu"
          >
            <img
              src={user?.profileImg || "https://i.pravatar.cc/300"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.pravatar.cc/300";
              }}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
              <p
                onClick={() => {
                  navigate("/dashboard/profile");
                  setDropdownOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
              >
                Profile
              </p>
              <button
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {userLoading && <div className="text-sm text-pink-200 ml-4">Loading user...</div>}
    </div>
  );
};

export default Topbar;
