import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col justify-center items-center px-6 py-16">

      <div className="max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          About <span className="text-red-500">GymBlog</span>
        </h1>

        <p className="text-lg mb-4 text-center">
          Welcome to GymBlog — the ultimate destination for fitness enthusiasts, bodybuilders, athletes, and anyone passionate about self-improvement. 💪
        </p>

        <p className="text-lg mb-4 text-center">
          We bring you expert workout routines, nutrition guides, supplement reviews, and daily motivation to fuel your fitness journey. Our mission is to educate, inspire, and help you become the strongest version of yourself.
        </p>

        <p className="text-lg text-center">
          Join our community and start your transformation today. 🚀
        </p>

        <div className="mt-8 flex justify-center">
          <Link to="/blog-list" className="btn btn-primary btn-lg">Read Blogs</Link>
        </div>
      </div>

    </div>
  );
};

export default About;
