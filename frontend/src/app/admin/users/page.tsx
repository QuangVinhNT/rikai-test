'use client';
import { useGetUsers } from '@/hooks';
import { Role } from '@/types';
import { HiOutlinePencilAlt, HiOutlineSearch, HiOutlineTrash } from 'react-icons/hi';

export default function Users() {
  const { data, isLoading } = useGetUsers();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Toolbar */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-800">Danh sách người dùng</h3>
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
              <th className="p-4 font-semibold">Tên người dùng</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Vai trò</th>
              <th className="p-4 font-semibold text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <span className="font-medium text-gray-700">{user.fullName || user.username}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm">{user.email}</td>
                <td className="p-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${user.role === Role.ADMIN ? 'text-red-700 bg-red-100' : user.role === Role.USER ? 'text-blue-700 bg-blue-100' : 'text-black bg-black/10'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <HiOutlinePencilAlt className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      {/* <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">Hiển thị 5 / 100 kết quả</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 text-sm">Trước</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Sau</button>
        </div>
      </div> */}
    </div>
  );
}
