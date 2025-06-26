import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profilePic: "",
  });

  // Fetch current profile data on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await AxiosInstance.get("/api/user/profile", {
          withCredentials: true,
        });
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.put("/api/user/profile", formData, {
        withCredentials: true,
      });
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex justify-center items-center px-4 py-16">
      <div className="max-w-xl mt-10 w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Edit Your <span className="text-red-500">Profile</span></h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label text-white">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full bg-white/20 text-white"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label text-white">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full bg-white/20 text-white"
              value={formData.email}
              disabled
            />
          </div>

          <div>
            <label className="label text-white">Bio</label>
            <textarea
              name="bio"
              rows="4"
              className="textarea textarea-bordered w-full bg-white/20 text-white"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label text-white">Profile Image URL</label>
            <input
              type="text"
              name="profilePic"
              className="input input-bordered w-full bg-white/20 text-white"
              value={formData.profilePic}
              onChange={handleChange}
              placeholder="Paste image link here"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
