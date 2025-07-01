import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosInstance } from '../../config/AxiosInstance';

const BlogList = () => {
  
  const [blogs, setBlogs] = useState([])

  const fetchAllBlogs = async () => {

    try {
      const res = await AxiosInstance.get("/blog/all-blog")
      setBlogs(res.data.AllBlogs || res.data)
    } catch (error) {
      console.log("Fetch All Blogs Error==",error.message)
    }

  }


  useEffect(()=>{
    fetchAllBlogs()
  },[])

  return (
    <div className="min-h-screen  bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-6 md:px-20">

      <h2 className="text-4xl mt-5 font-bold text-center mb-12">📝 Latest Blogs</h2>

      <div className="grid gap-10 md:grid-cols-3">
        {blogs.map((blog,index) => (
          <div key={blog._id} className="card bg-white/10 backdrop-blur-sm shadow-lg border border-white/20">
            <figure><img src={blog?.image} alt={blog?.title} /></figure>
            <div className="card-body">
              <h2 className="card-title text-white">{blog?.title}</h2>
              <p>{blog?.content}</p>
              <div className="card-actions justify-end">
                <Link to={`/blog-details/${blog._id}`} className="btn btn-sm btn-primary">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BlogList;
