import { Leaf, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const navLinks = [
    { id: 1, name: "Shop", href: "/shop" },
    { id: 2, name: "About", href: "/about" },
    { id: 3, name: "Impact", href: "/impact" },
    { id: 4, name: "Blog", href: "/blog" },
  ];
  return (
    <nav className="sticky top-0 z-40 flex justify-between px-16 py-3 border-b bg-white/70 backdrop-blur-sm border-b-green-800/20">
      <Link to={"/"} className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full">
          <Leaf className="text-white" />
        </div>
        <span className="font-serif text-xl font-semibold">EcoCart</span>
      </Link>
      <div className="flex items-center justify-center gap-8">
        {navLinks.map((item) => (
          <Link to={item.href} key={item.id}>
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-8">
        <button className="p-2 transition-colors duration-300 rounded-md cursor-pointer hover:bg-green-700/80 hover:text-white">
          <User className="w-5 h-5" />
        </button>
        <button className="p-2 transition-colors duration-300 rounded-md cursor-pointer hover:bg-green-700/80 hover:text-white">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
