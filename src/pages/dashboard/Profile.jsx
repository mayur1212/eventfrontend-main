import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR = 'https://i.pravatar.cc/300';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImg, setPreviewImg] = useState(DEFAULT_AVATAR);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if ([401, 403].includes(res.status)) {
            localStorage.removeItem('token');
            return navigate('/');
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await res.json();
        const profileImg = data.profileImg || DEFAULT_AVATAR;

        setUser({ ...data, profileImg });
        setFormData({ ...data });
        setPreviewImg(profileImg);
      } catch {
        setError('Could not load profile');
        navigate('/');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImg: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/remove-profile-image`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return setError('Could not remove image.');

      setPreviewImg(DEFAULT_AVATAR);
      setFormData(prev => ({ ...prev, profileImg: '' }));
      setUser(prev => ({ ...prev, profileImg: DEFAULT_AVATAR }));
      setSuccess('Image removed successfully.');
      setError(null);
    } catch {
      setError('Server error while deleting image.');
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const payload = new FormData();

    payload.append('clientName', formData.clientName || '');
    payload.append('email', formData.email || '');
    payload.append('contactNumber', formData.contactNumber || '');

    if (formData.profileImg instanceof File) {
      payload.append('profileImg', formData.profileImg);
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/update-profile`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      if (!res.ok) return setError('Failed to update profile');

      const updatedData = await res.json();

      const newProfileImg = updatedData.profileImg
        ? `${updatedData.profileImg}?t=${Date.now()}`
        : DEFAULT_AVATAR;

      setUser({ ...updatedData, profileImg: newProfileImg });
      setFormData({ ...updatedData });
      setPreviewImg(newProfileImg);

      setEditMode(false);
      setSuccess('Profile updated successfully!');
      setError(null);
    } catch {
      setError('Could not update profile');
    }
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Profile Image */}
        <div className="md:w-1/3 bg-gray-100 relative flex items-center justify-center p-4">
          <img
            src={previewImg}
            alt="Profile"
            className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-md"
          />
          {editMode && (
            <div className="absolute bottom-4 flex gap-2">
              <label htmlFor="img-upload" className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer text-sm">
                Change
              </label>
              <button onClick={handleDeleteImage} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                Delete
              </button>
              <input
                id="img-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-indigo-700">Profile Information</h2>

          {['clientName', 'email', 'contactNumber'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-600 capitalize">
                {field === 'clientName' ? 'Name' : field === 'contactNumber' ? 'Contact Number' : 'Email'}
              </label>
              {editMode ? (
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded text-black"
                />
              ) : (
                <p className="text-gray-800 mt-1">{user[field]}</p>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            {editMode ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setFormData(user);
                    setPreviewImg(user.profileImg);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Alerts */}
          {error && <div className="text-red-600 mt-2">{error}</div>}
          {success && <div className="text-green-600 mt-2">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
