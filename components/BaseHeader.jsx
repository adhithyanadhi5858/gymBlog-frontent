import { Link } from "react-router-dom";

const HeaderPublic = () => {
  return (
    <div className="navbar bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          Gym<span className="text-red-500">Blog</span>
        </Link>
      </div>

      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-lg">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog-list">Blogs</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
        >
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog-list">Blogs</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderPublic;
