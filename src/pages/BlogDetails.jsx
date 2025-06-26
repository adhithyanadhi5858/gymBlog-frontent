import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await AxiosInstance.get(`/blog/single-blog/${id}`);
        setBlog(res.data.Blog);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <h2 className="text-3xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <h2 className="text-3xl font-bold">Blog Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-4 md:px-20">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg mt-10 border border-white/20 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center">{blog.title}</h1>

        {blog.image && (
          <div className="mb-8">
            <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover rounded-lg border border-white/20" />
          </div>
        )}

        <p className="mb-6 text-lg">{blog.content}</p>

        <div className="flex justify-between items-center mt-8">
          <span className="badge badge-outline text-lg p-3">{blog.category}</span>
          <Link to="/blog-list" className="btn btn-sm btn-primary">Back to Blogs</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
