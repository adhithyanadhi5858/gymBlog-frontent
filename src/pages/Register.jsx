import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AxiosInstance } from "../../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { saveUser } from "../features/userSlice";

const Register = () => {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
     await AxiosInstance.post('user/register', data)
        .then(res => {
          console.log(res.data)
          dispatch(saveUser(res.data.newUser))
          alert("Registered Successfully")
          setTimeout(() => navigate("/user/profile"), 2000)

        }).catch(err => {
          console.log("registerError ===", err)
        })
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-lg mt-10 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Gym<span className="text-red-500">Blog</span></h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label text-white">Name</label>
            <input
              type="text"
              name="name"
              required
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              placeholder="Enter your name"
              {...register('name')}
            />
          </div>

          <div>
            <label className="label text-white">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              placeholder="Enter your email"
              {...register('email')}
            />
          </div>

          <div>
            <label className="label text-white">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              placeholder="Enter your password"
              {...register('password')}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Register</button>

          <p className="text-center text-sm mt-4">
            Already have an account? <Link to="/login" className="text-red-400 font-semibold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
