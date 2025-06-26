import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";

const CreateBlog = () => {

  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [category, setCategory] = useState()
  const [image, setImage] = useState()

  const navigate = useNavigate();

  const handleImageChange = (e) => setImage(e.target.files[0])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image || !category) {

      console.log(title,content,image,category)

      alert("All Field Required")

      return;
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append('content', content)
    formData.append('category', category)
    formData.append("image",image)

    try {

      const res = await AxiosInstance.post("blog/create-blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      alert("Blog Created Successfully")
      setTitle("")
      setCategory("")
      setContent("")
      setImage(null)
      navigate("/blog-list")

    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex justify-center items-center px-4 py-16">
      <div className="max-w-xl w-full bg-white/10 mt-10 backdrop-blur-lg border border-white/20 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Create Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label text-white">Title</label>
            <input
              type="text"
              name="title"
              required
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              placeholder="Enter blog title"
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="label text-white">Content</label>
            <textarea
              name="content"
              required
              rows="5"
              className="textarea textarea-bordered w-full bg-white/20 text-white placeholder-gray-300"
              placeholder="Write your blog content"
              onChange={(e)=>setContent(e.target.value)}
            />
          </div>

          <div>
            <label className="label text-white">Category</label>
            <input
              type="text"
              name="category"
              className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300"
              placeholder="e.g. Workouts, Nutrition"
              onChange={(e)=>setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="label text-white">Image</label>
            <input
              type="file"
              name="image"
              className="input input-bordered pointer w-full bg-white/20 text-white placeholder-gray-300"
              placeholder="Upload Your Image"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Publish</button>

        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
