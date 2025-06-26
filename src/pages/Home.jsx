import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosInstance } from '../../config/AxiosInstance';

const Home = () => {

  const [blogs, setBlogs] = useState([]);

  const fetchLatestBlogs = async () => {
    try {
      const res = await AxiosInstance.get("/blog/latest");
      setBlogs(res.data.latestBlogs || res.data); // adjust based on your backend response
    } catch (error) {
      console.log("Latest blogs fetching error:", error.message);
    }
  };

  useEffect(() => {
    fetchLatestBlogs();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      {/* Hero Section */}
      <div className="hero min-h-screen bg-[url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')] bg-cover bg-center">
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-extrabold text-white drop-shadow-lg">Train Hard. Blog Smart.</h1>
            <p className="mb-5 text-lg">
              Explore expert workout tips, nutrition guides, and powerful motivation to fuel your fitness journey. 💪
            </p>
            <Link to="/blog-list" className="btn btn-primary btn-lg">Start Reading</Link>
          </div>
        </div>
      </div>

      {/* Featured Blogs Section */}
      <div className="py-16 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">🔥 Latest Blogs</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((item, index) => (
            <div key={item._id} className="card bg-white/10 backdrop-blur-sm shadow-xl border border-white/20">
              <figure><img src={item.image} alt="Blog" /></figure>
              <div className="card-body">
                <h2 className="card-title text-white">{item.title}</h2>
                <p>{item.content} </p>
                <div className="card-actions justify-end">
                  <Link to={`/blog/${item.id}`} className="btn btn-sm btn-primary">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 bg-black bg-opacity-30">
        <h2 className="text-4xl font-bold text-center mb-10">📚 Categories</h2>
        <div className="flex justify-center flex-wrap gap-6">
          {['Workouts', 'Nutrition', 'Supplements', 'Mindset', 'Motivation'].map((cat, i) => (
            <div key={i} className="badge badge-lg badge-outline text-xl p-5 cursor-pointer border-red-500">
              {cat}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
