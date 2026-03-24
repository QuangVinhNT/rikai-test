import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold">Logo</div>
        <ul className="flex gap-6">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/" className="hover:text-blue-600">Products</Link></li>
          <li><Link href="/" className="hover:text-blue-600">Favourites</Link></li>
        </ul>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 cursor-pointer text-blue-600 border border-blue-600 rounded hover:bg-blue-50 text-sm">
            Log In
          </button>
          <Link href={"/register"} className="px-4 py-1.5 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
