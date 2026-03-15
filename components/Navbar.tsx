import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Le Logo cliquable qui ramène à l'accueil */}
        <Link href="/" className="text-2xl font-black text-red-600 tracking-wider hover:scale-105 transition-transform">
          JaponGuide ⛩️
        </Link>

        {/* Les liens du menu */}
        <div className="flex gap-6 font-medium">
          <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
            Accueil
          </Link>
          <Link href="/a-propos" className="text-gray-700 hover:text-red-600 transition-colors">
            À propos
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;