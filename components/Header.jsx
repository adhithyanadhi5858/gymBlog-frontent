import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar backdrop-blur-md bg-white/20 border-b border-white/30 shadow-md px-6 fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/"className="text-2xl text-base-100 font-bold mb-2">Gym<span className="text-red-500">Blog</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ul className="menu  menu-horizontal px-1 font-semibold text-base-100 text-lg">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog-list">Blogs</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/user/create-blog">Add Blogs</Link></li>
          <li><Link to="/user/my-blog">My Blogs</Link></li>
          <li><Link to="/user/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog-list">Blogs</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/user/create-blog">Add Blogs</Link></li>
          <li><Link to="/user/my-blog">My Blogs</Link></li>
          <li><Link to="/user/profile">Profle</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
