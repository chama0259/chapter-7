import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#222222] p-6 font-bold text-white">
      <Link to="/" className="hover:opacity-80 transition-opacity">
        Blog
      </Link>
      <Link to="/contact" className="hover:opacity-80 transition-opacity">
        お問い合わせ
      </Link>
    </header>
  );
};

export default Header;
