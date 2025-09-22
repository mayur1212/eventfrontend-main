import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// User provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for user in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);

  // Fetch user details from the server using token
const fetchUser = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUser({
        ...data,
      

          profileImage: data.profileImg
  ? data.profileImg.startsWith('http')
    ? data.profileImg
    : `${process.env.REACT_APP_API_BASE_URL}${data.profileImg}`
  : 'https://i.pravatar.cc/300',

      });
    } else {
      console.error('Unauthorized or error fetching user');
      localStorage.removeItem('token');
      setUser(null);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    localStorage.removeItem('token');
    setUser(null);
  }
};


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
