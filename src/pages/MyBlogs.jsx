import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast, { Toaster } from 'react-hot-toast';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);

  const fetchMyBlogs = async () => {
    try {
      const res = await AxiosInstance.get("blog/my-blogs", {
        withCredentials: true,
      });
      setMyBlogs(res.data.Blogs); 
    } catch (err) {
      console.error("Error fetching my blogs:", err.message);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await AxiosInstance.delete(`blog/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Blog Deleted")
      setMyBlogs(myBlogs.filter((blog) => blog._id !== id));

    } catch (err) {
      console.error("Error deleting blog:", err.message);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-16">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-4xl mt-5 font-bold text-center mb-10">📝 My Blogs</h2>

      {myBlogs.length === 0 ? (
        <p className="text-center text-gray-400">You haven't written any blogs yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {myBlogs.map((blog) => (
            <div key={blog._id} className="card bg-white/10 border border-white/20 shadow-lg">
              {blog.image && (
                <figure>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-48 w-full object-cover rounded-t-lg"
                  />
                </figure>
              )}
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p className="text-sm text-gray-300">
                  {blog.content.length > 100 ? blog.content.slice(0, 100) + "..." : blog.content}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`edit-blog/${blog._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
