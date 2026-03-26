'use client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HiOutlineViewGrid, 
  HiOutlineUsers, 
  HiOutlineCog, 
  HiOutlineLogout 
} from 'react-icons/hi';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: HiOutlineViewGrid },
  { name: 'Users', href: '/admin/users', icon: HiOutlineUsers },
  { name: 'Settings', href: '/admin/settings', icon: HiOutlineCog },
];

export default function Sidebar() {
  const pathname = usePathname();
  const {logoutUser} = useAuth()

  const handleLogout = () => {
    logoutUser()
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col px-3 py-4">
        <div className="mb-10 flex items-center pl-2.5">
          <span className="self-center text-xl font-bold whitespace-nowrap text-blue-600">
            MY-APP <span className="text-gray-700">ADMIN</span>
          </span>
        </div>
        
        <ul className="space-y-2 font-medium flex-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors group ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <button className="flex items-center justify-center w-full p-3 text-red-600 bg-red-50 transition-colors rounded-lg hover:bg-red-600 hover:text-white group font-medium cursor-pointer" onClick={handleLogout}>
            <HiOutlineLogout className="w-6 h-6" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
