import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast, { Toaster } from 'react-hot-toast';

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Fetch current profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await AxiosInstance.get("user/profile", {
          withCredentials: true,
        });

        const { name, email, bio, profilePic } = res.data.UserData;
        setName(name);
        setEmail(email);
        setBio(bio || "");
        setPreview(profilePic);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };

    fetchProfile();
  }, []);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (image) formData.append("image", image); // Only send if new image is selected

    try {
      const res = await AxiosInstance.put("/user/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res.data)
      toast.success("Profile updated successfull!");
      navigate("/user/profile");
    } catch (err) {
      console.error("Update error:", err.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex justify-center items-center px-4 py-16">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-xl mt-10 w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Edit Your <span className="text-red-500">Profile</span></h2>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="label text-white">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full bg-white/20 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label text-white">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              disabled
              className="input input-bordered w-full bg-white/20 text-white"
            />
          </div>

          <div>
            <label className="label text-white">Bio</label>
            <textarea
              name="bio"
              rows="4"
              className="textarea textarea-bordered w-full bg-white/20 text-white"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div>
            <label className="label text-white">Profile Image</label>
            {preview && (
              <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-lg mb-2 border border-white/30" />
            )}
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={imageHandler}
              className="file-input file-input-bordered w-full bg-white/20 text-white"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
