import { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/userSlice";
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await AxiosInstance.get("user/profile", {
            withCredentials: true,
          });
          setUser(res.data.UserData);
        } catch (err) {
          console.error("Error fetching profile:", err.message);
        }
      };

      fetchProfile();
    }, []);

  const Logout = async () => {
    try {

      const res = await AxiosInstance.get("user/logout")
      dispatch(clearUser())
      toast.success("Logout Successful!")
      setTimeout(()=>navigate("/login"),3000)

    } catch (error) {
      console.log("Logout Error===", error.message)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <p className="text-2xl font-bold">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-4 flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
              <img src={user.profilePic || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="profile" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">{user.name}</h2>
        <p className="text-center text-lg text-gray-300 mb-1">{user.email}</p>
        {user.bio && <p className="text-center italic text-gray-400">"{user.bio}"</p>}

        <div >
          <div className="mt-8 text-center">
            <Link to="edit" className="btn btn-outline btn-primary">Edit Profile</Link>
          </div>
          <div className="mt-8 text-center">
            <button onClick={Logout} className="btn btn-outline btn-primary">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;