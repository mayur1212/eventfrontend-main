import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')?.trim();
      if (!token || token === 'undefined') return;

      setLoading(true);
      setFetchError(null);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          // ✅ Fix the profile image URL logic
          const imageUrl = data?.profileImg?.startsWith('http')
            ? data.profileImg
            : `${process.env.REACT_APP_API_BASE_URL}${data.profileImg}`;

          setUser({
            ...data,
            profileImage: imageUrl || 'https://i.pravatar.cc/300',
          });
        } else {
          let errData = {};
          try {
            errData = await response.json();
          } catch {
            errData = { message: response.statusText };
          }
          console.error('Fetch user failed:', errData);
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setUser(null);
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/');
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
              src={user?.profileImage || 'https://i.pravatar.cc/300'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
              <p
                onClick={() => {
                  navigate('/dashboard/profile');
                  setDropdownOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                title="Go to Profile"
              >
                Profile
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                title="Logout"
              >
                Logoutmmm
              </button>
            </div>
          )}
        </div>
      </div>

      {loading && <div className="text-sm text-pink-200 ml-4">Loading user...</div>}
      {fetchError && <div className="text-sm text-red-400 ml-4">Error: {fetchError}</div>}
    </div>
  );
};

export default Topbar;
