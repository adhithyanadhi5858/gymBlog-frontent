import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderPublic from '../components/BaseHeader';
import { AxiosInstance } from '../config/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../src/features/userSlice';

function UserLayout() {
  const dispatch = useDispatch();
  const { isUserAuth } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await AxiosInstance.get('user/check-user', {
          withCredentials: true,
        });
        if (res.data?.UserData) {
          dispatch(saveUser(res.data.UserData))
        }
      } catch (error) {
        console.log("Profile fetch error ====", error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchProfile();
  }, []);

  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      {isUserAuth ? <Header /> : <HeaderPublic />}

      {/* Page Content */}
      <div className="min-h-96">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserLayout;
