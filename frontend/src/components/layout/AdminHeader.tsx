'use client';

import { userStore } from '@/stores';

const AdminHeader = () => {
  const {user} = userStore();
  return (
    <header className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800">Management System</h2>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium">Admin Name</p>
          <p className="text-xs text-gray-500">{user?.username}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
