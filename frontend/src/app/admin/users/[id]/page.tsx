'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaUserTag } from 'react-icons/fa';
import {
  HiArrowLeft,
  HiCheckCircle,
  HiEnvelope,
  HiLockClosed,
  HiPencilSquare,
  HiUser
} from 'react-icons/hi2';

export default function UserDetailPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="shrink-0 mb-4 flex flex-col gap-3">
        <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
          <HiArrowLeft />
          Back to list
        </Link>

        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Edit User Profile</h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Management / ID: #12509</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2"
            >
              <HiPencilSquare size={18} /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2.5 text-sm font-bold text-gray-400">Cancel</button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all flex items-center gap-2"
              >
                <HiCheckCircle size={18} /> Save
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-4 space-y-2">
            <div className="space-y-2">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] px-1">Account Basics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" defaultValue="Rikai Intern Developer" icon={HiUser} disabled={!isEditing} className={'col-span-2'}/>
                <InputField label="Username" defaultValue="rikai_intern_2024" icon={FaUserTag} disabled={true} />
                <InputField label="Email Address" defaultValue="intern@rikai.com" type="email" icon={HiEnvelope} disabled={!isEditing} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] px-1">Authority</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-800 ml-1">System Role</label>
                  <select
                    disabled={!isEditing}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all disabled:opacity-40 appearance-none"
                  >
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 px-6 py-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-red-700">
                <HiLockClosed size={20} />
                <span className="text-xs font-black uppercase tracking-tight">Access Control: Lock Account</span>
              </div>
              <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-xs font-black rounded-lg hover:bg-red-600 hover:text-white transition-all">DEACTIVATE</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
      `}</style>
    </div>
  );
}

// Reusable Input Component (Theme Blue-600)
const InputField = ({ label, defaultValue, icon: Icon, disabled, type = "text", className }: any) => (
  <div className={`space-y-2 ${className}`}>
    <label className="text-[13px] font-bold text-gray-800 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
        <Icon size={18} />
      </div>
      <input
        type={type} defaultValue={defaultValue} disabled={disabled}
        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none disabled:opacity-50"
      />
    </div>
  </div>
);
