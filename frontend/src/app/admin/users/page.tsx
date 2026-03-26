'use client';
import { useGetUsers } from '@/hooks';
import { Role } from '@/types';
import { useRouter } from 'next/navigation';
import { HiChevronLeft, HiChevronRight, HiOutlineLockClosed, HiOutlineLockOpen, HiOutlinePencilAlt, HiOutlineSearch, HiOutlineTrash } from 'react-icons/hi';

export default function Users() {
  const { data } = useGetUsers();
  const router = useRouter();

  return (
    /* h-full giúp component chiếm trọn diện tích main của layout */
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">

      {/* 1. Toolbar - Cố định (shrink-0) */}
      <div className="p-6 border-b border-gray-100 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-800">User List</h3>
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* 2. Table Area - Đây là phần duy nhất được SCROLL (flex-1) */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-left border-collapse relative">
          <thead className="sticky top-0 z-10 bg-gray-50 shadow-sm">
            <tr className="text-gray-600 text-sm uppercase">
              <th className="p-4 font-semibold">Fullname/Username</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.data.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                onClick={() => router.push(`/admin/users/${user.id}`)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700 truncate max-w-[200px]">
                      {user.fullName || user.username}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm truncate max-w-[200px]">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${user.role === Role.ADMIN ? 'text-red-700 bg-red-100' : 'text-blue-700 bg-blue-100'
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center gap-1">
                    <button className="p-2 text-blue-600 rounded-lg shadow-sm border border-transparent hover:border-blue-100 cursor-pointer"><HiOutlinePencilAlt size={18} /></button>
                    <button className="p-2 text-red-600 rounded-lg shadow-sm border border-transparent hover:border-red-100 cursor-pointer"><HiOutlineTrash size={18} /></button>
                    <button className="p-2 text-gray-400 rounded-lg shadow-sm border border-transparent hover:border-gray-200 cursor-pointer">
                      {user.isLocked ? <HiOutlineLockClosed size={18} /> : <HiOutlineLockOpen size={18} className="text-green-600 " />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Pagination - Cố định ở đáy (shrink-0) */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 shrink-0 flex items-center justify-between">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Showing <span className="text-blue-600">{data?.data.length || 0}</span> Users
        </p>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
            <HiChevronLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center px-4 bg-white border border-gray-200 rounded-xl text-xs font-black text-blue-600 shadow-sm">
            PAGE 1
          </div>
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
            <HiChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
      `}</style>
    </div>
  );
}
