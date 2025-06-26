const Footer = () => {
  return (
    <footer className="footer footer-center p-8 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
      <div>
        <h2 className="text-2xl font-bold mb-2">Gym<span className="text-red-500">Blog</span></h2>
        <p className="font-semibold">
          Your daily dose of fitness, motivation & knowledge 💪
        </p>
      </div>
      <div className="flex gap-6 mt-4">
        <a href="#" className="hover:text-red-500 transition"><i className="fa-brands fa-instagram text-2xl"></i></a>
        <a href="#" className="hover:text-blue-400 transition"><i className="fa-brands fa-facebook text-2xl"></i></a>
        <a href="#" className="hover:text-sky-400 transition"><i className="fa-brands fa-twitter text-2xl"></i></a>
        <a href="#" className="hover:text-pink-400 transition"><i className="fa-brands fa-youtube text-2xl"></i></a>
      </div>
      <div className="mt-4">
        <p>© {new Date().getFullYear()} GymBlog. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
