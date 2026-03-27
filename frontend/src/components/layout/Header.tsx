'use client';
import { userStore } from '@/stores';
import Link from 'next/link';

const Header = () => {
  const { user } = userStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
            LOGO
          </Link>

          {/* Navigation Desktop */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <li>
              <Link href="/" className="transition-colors hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link href="/products" className="transition-colors hover:text-blue-600">Products</Link>
            </li>
            <li>
              <Link href="/favourites" className="transition-colors hover:text-blue-600">Favourites</Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user?.username ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Account</p>
                <Link
                  href="/me"
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {user.username}
                </Link>
              </div>
              {/* Avatar placeholder */}
              <Link href="/me" className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 hover:ring-2 hover:ring-blue-100 transition-all">
                {user.username.charAt(0).toUpperCase()}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full shadow-sm transition-all active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
