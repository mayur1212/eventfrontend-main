import API_BASE_URL from "../../api";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext); // setUser is updateUser from provider
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImg, setPreviewImg] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch profile on mount (only if no user present) - the UserProvider already fetches, so this is defensive
  useEffect(() => {
    if (!user) return;
    setFormData(user);
    setPreviewImg(user.profileImg || "");
  }, [user]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImg: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle delete image
  const handleDeleteImage = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${API_BASE_URL}/remove-profile-image`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Could not remove image.");

      const updatedUser = { ...user, profileImg: "" };
      setPreviewImg("");
      setFormData((prev) => ({ ...prev, profileImg: "" }));
      // use context setter (which writes localStorage and normalizes image)
      setUser(updatedUser);
      setSuccess("Profile image removed successfully!");
      setError(null);
    } catch (err) {
      console.error("Image delete error:", err);
      setError("Server error while deleting image.");
    }
  };

  // Handle update with progress bar
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Session expired. Please login again.");

    const payload = new FormData();
    payload.append("clientName", formData.clientName || "");
    payload.append("email", formData.email || "");
    payload.append("contactNumber", formData.contactNumber || "");
    if (formData.profileImg instanceof File) {
      payload.append("profileImg", formData.profileImg);
    }

    try {
      setError(null);
      setSuccess(null);
      setUploadProgress(10);

      const res = await fetch(
        `${API_BASE_URL}/update-profile`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: payload,
        }
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid response.");
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update profile.");
      }

      setUser(data.user);

      setEditMode(false);
      setUploadProgress(100);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    } finally {
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  if (!user)
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Profile Image */}
        <div className="md:w-1/3 bg-gray-100 relative flex items-center justify-center p-4">
          {previewImg ? (
            <img
              src={previewImg}
              alt="Profile"
              className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-md"
              onError={() => setPreviewImg("")}
            />
          ) : (
            <span aria-label="Profile initials" className="flex w-40 h-40 items-center justify-center rounded-full bg-indigo-100 text-4xl font-semibold text-indigo-700">
              {user.clientName?.trim().charAt(0).toUpperCase() || "U"}
            </span>
          )}
          {editMode && (
            <div className="absolute bottom-4 flex gap-2">
              <label
                htmlFor="img-upload"
                className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer text-sm"
              >
                Change
              </label>
              <button
                onClick={handleDeleteImage}
                className="dashboard-action delete"
              >
                Delete
              </button>
              <input
                id="img-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Right: Profile Info */}
        <div className="flex-1 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-indigo-700">Profile Information</h2>
          {["clientName", "email", "contactNumber"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-600 capitalize">
                {field === "clientName" ? "Name" : field === "contactNumber" ? "Contact Number" : "Email"}
              </label>
              {editMode ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded text-black"
                />
              ) : (
                <p className="text-gray-800 mt-1">{user[field]}</p>
              )}
            </div>
          ))}

          {/* Progress bar */}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div
                className="bg-green-600 h-2 rounded transition-all duration-500"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            {editMode ? (
              <>
                <button onClick={handleUpdate} className="dashboard-button primary">
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
              <button onClick={() => setEditMode(true)} className="dashboard-action edit">
                Edit Profile
              </button>
            )}
          </div>

          {/* Messages */}
          {error && <div className="text-red-600 mt-2">{error}</div>}
          {success && <div className="text-green-600 mt-2">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
