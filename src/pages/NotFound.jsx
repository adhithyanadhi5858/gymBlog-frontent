import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col justify-center items-center text-white px-4">
      <h1 className="text-6xl font-extrabold text-red-500 mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-8 text-center max-w-lg">
        Oops! The page you're looking for doesn't exist. You may have mistyped the address or the page has been moved.
      </p>
      <Link to="/" className="btn btn-primary text-white text-lg">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
