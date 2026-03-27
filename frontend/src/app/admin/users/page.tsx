'use client';
import { DeleteConfirmModal } from '@/components/ui';
import { useGetUsers, useUser } from '@/hooks';
import { userStore } from '@/stores';
import { Role } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'sonner';

export default function Users() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '5';
  const { data } = useGetUsers(+page, +limit);
  const { user } = userStore();
  const router = useRouter();
  const { lockUser, unlockUser, deleteUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: number, username: string; } | null>(null);
  const pathname = usePathname();
  const createPageURL = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    return `${pathname}?${params.toString()}`;
  };
  const handlePageChange = (newPage: number) => {
    router.push(createPageURL(newPage));
  };

  const handleLimitChange = (newLimit: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLockUser = (id: number, action: 'lock' | 'unlock') => {
    try {
      if (action === 'lock') {
        lockUser(id);
      } else if (action === 'unlock') {
        unlockUser(id);
      }
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const handleConfirmDelete = (id: number) => {
    try {
      deleteUser(id, {
        onSuccess: () => {
          setIsModalOpen(false);
        }
      });
    } catch (error) {
      toast.error('Action failed');
    }
  };

  return (
    /* h-full giúp component chiếm trọn diện tích main của layout */
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">

      {/* 1. Toolbar - Cố định (shrink-0) */}
      <div className="p-6 border-b border-gray-100 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Users</h1>
        {/* <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div> */}
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
            {data?.data.map((userData) => (
              <tr
                key={userData.id}
                className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                onClick={() => router.push(`/admin/users/${userData.id}`)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {userData.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700 truncate max-w-50">
                      {userData.fullName || userData.username}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm truncate max-w-50">{userData.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${userData.role === Role.ADMIN ? 'text-red-700 bg-red-100' : 'text-blue-700 bg-blue-100'
                    }`}>
                    {userData.role}
                  </span>
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center gap-1">
                    {user?.id !== userData.id && (
                      <>
                        <button
                          className="p-2 text-red-600 rounded-lg shadow-sm border border-transparent hover:border-red-100 cursor-pointer" onClick={() => {
                            setIsModalOpen(true);
                            setDeleteData({ id: userData.id, username: userData.username });
                          }}
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                        <button className={`p-2 text-gray-400 rounded-lg shadow-sm border border-transparent hover:border-red-100 cursor-pointer ${userData.isLocked ? 'bg-red-600' : 'bg-white'}`} onClick={() => handleLockUser(userData.id, userData.isLocked ? 'unlock' : 'lock')}>
                          {userData.isLocked ? <HiOutlineLockClosed size={18} className='text-white' /> : <HiOutlineLockOpen size={18} className="text-green-600 " />}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Pagination - Cố định ở đáy (shrink-0) */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0 flex items-center justify-between">

        {/* Phần bên trái: Chọn số lượng User mỗi trang */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            Rows per page:
          </span>
          <div className="relative group">
            <select
              value={limit} // Giá trị limit từ state của bạn
              onChange={(e) => handleLimitChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-blue-600 text-xs font-bold py-2 pl-4 pr-10 rounded-xl hover:border-blue-400 hover:ring-4 hover:ring-blue-50 transition-all cursor-pointer outline-none shadow-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            {/* Icon mũi tên custom */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Phần bên phải: Điều hướng trang */}
        <div className="flex gap-2">
          <button
            disabled={+page === 1}
            onClick={() => handlePageChange(+page - 1)}
            className="p-2.5 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 hover:border-blue-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-90"
          >
            <HiChevronLeft size={20} className="text-gray-600" />
          </button>

          <div className="flex items-center px-5 bg-white border border-gray-200 rounded-xl text-[11px] font-black text-blue-600 shadow-sm uppercase tracking-tighter">
            Page <span className="ml-1 text-gray-900">{page}</span>
          </div>

          <button
            disabled={+page >= Number(data?.meta?.lastPage)}
            onClick={() => handlePageChange(+page + 1)}
            className="p-2.5 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 hover:border-blue-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm active:scale-90"
          >
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

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => { handleConfirmDelete(deleteData?.id || 0); }}
        userName={deleteData?.username || ''}
      />
    </div>
  );
}
