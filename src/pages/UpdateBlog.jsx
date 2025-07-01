import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast, { Toaster } from 'react-hot-toast';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await AxiosInstance.get(`/blog/single-blog/${id}`);
        const blog = res.data.Blog;
        setTitle(blog?.title);
        setContent(blog?.content);
        setCategory(blog?.category);
        setPreviewImage(blog?.image); // preview old image
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = (e.target.files[0])
    setImage(file)
    setPreviewImage(URL.createObjectURL(file)); // preview selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image); // only if user selects new image

    try {
      const res = await AxiosInstance.put(`/blog/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success("Blog updated!");
      console.log("update blog===", res.data)
      navigate("/user/my-blog");
    } catch (err) {
      console.error("Update error:", err.message);
      toast.error("Failed to update blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex justify-center items-center px-4 py-16">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-xl w-full bg-white/10 mt-10 backdrop-blur-lg border border-white/20 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Update Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label text-white">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full bg-white/20 text-white"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="label text-white">Content</label>
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea textarea-bordered w-full bg-white/20 text-white"
              placeholder="Write blog content"
              required
            />
          </div>

          <div>
            <label className="label text-white">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input input-bordered w-full bg-white/20 text-white"
              placeholder="e.g. Fitness, Nutrition"
              required
            />
          </div>

          <div>
            <label className="label text-white">Image</label>
            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                className="w-full h-40 object-cover rounded-md mb-3 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full text-white bg-white/20"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Update Blog</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
