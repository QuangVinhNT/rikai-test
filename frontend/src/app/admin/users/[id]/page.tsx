'use client';

import { useGetUser, useUser } from '@/hooks';
import { userStore } from '@/stores';
import { Role } from '@/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserTag } from 'react-icons/fa';
import {
  HiArrowLeft,
  HiCheckCircle,
  HiEnvelope,
  HiLockClosed,
  HiLockOpen,
  HiPencilSquare,
  HiUser
} from 'react-icons/hi2';
import { toast } from 'sonner';

interface InputFieldProps {
  label: string;
  icon: React.ElementType;
  error?: string;
  [key: string]: any;
}

interface UserFormInput {
  username: string;
  fullName: string;
  email: string;
  role: Role; // Lấy chính xác kiểu Enum từ type User
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon: Icon, disabled, type = "text", className, error, ...props }, ref) => (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center ml-1">
        <label className="text-[13px] font-bold text-gray-800">{label}</label>
        {error && (
          <span className="text-[10px] font-black text-red-500 uppercase tracking-tight animate-pulse">
            {error}
          </span>
        )}
      </div>
      <div className="relative group">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-600'
          }`}>
          <Icon size={18} />
        </div>
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          {...props}
          className={`w-full pl-11 pr-4 py-3.5 rounded-xl border font-bold text-sm transition-all outline-none 
            ${disabled ? 'opacity-50 bg-gray-50/50 border-gray-100' : 'bg-white focus:ring-4'}
            ${error
              ? 'border-red-200 bg-red-50/20 focus:ring-red-50 focus:border-red-400'
              : 'border-gray-100 focus:ring-blue-50 focus:border-blue-400'
            }`}
        />
      </div>
    </div>
  )
);
InputField.displayName = 'InputField';

// --- 2. Main Page Component ---
export default function UserDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const param = useParams();
  const userId = +param.id!;
  const { updateUser, lockUser, unlockUser } = useUser();

  // Data Fetching
  const { data, isLoading, refetch } = useGetUser(userId);
  const { user: currentUser } = userStore();

  // React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormInput>({
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      role: Role.USER,
    }
  });

  // Cập nhật form khi data từ API về
  useEffect(() => {
    if (data?.data) {
      reset({
        username: data.data.username,
        fullName: data.data.fullName,
        email: data.data.email,
        role: data.data.role,
      });
    }
  }, [data, reset]);

  // Handle Update Profile
  const onSaveProfile = async (formData: UserFormInput) => {
    const { fullName, email } = formData;
    try {
      updateUser(
        { id: userId, payload: { fullName, email } },
        {
          onSuccess: () => {
            setIsEditing(false);
            refetch();
          }
        }
      );
    } catch (err) {
      toast.error("Action failed!");
    }
  };

  // Handle Lock/Unlock
  const handleToggleLock = async () => {
    try {
      if (data?.data.isLocked) {
        unlockUser(userId, {
          onSuccess: () => {
            refetch();
          }
        });
      } else {
        lockUser(userId, {
          onSuccess: () => {
            refetch();
          }
        });
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  if (isLoading) return <div className="p-10 text-center font-bold text-gray-400">Loading user data...</div>;

  return (
    <div className="h-full flex flex-col overflow-hidden p-1">
      {/* Header Section */}
      <div className="shrink-0 mb-6 flex flex-col gap-4">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-all group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to list
        </Link>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">User Profile</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">
              Management / ID: <span className="text-blue-600">#{data?.data.id}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="cursor-pointer bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 shadow-xl shadow-gray-200 transition-all flex items-center gap-2"
              >
                <HiPencilSquare size={18} /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setIsEditing(false); reset(); }}
                  className="cursor-pointer px-5 py-3 text-sm font-bold text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onSaveProfile)}
                  className="cursor-pointer bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all flex items-center gap-2"
                >
                  <HiCheckCircle size={20} /> Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 space-y-10">

            {/* Section: Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Account Basics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField
                  label="Full Name"
                  icon={HiUser}
                  disabled={!isEditing}
                  className="col-span-2"
                  {...register('fullName', { required: "Full name is required" })}
                  error={errors.fullName?.message}
                />
                <InputField
                  label="Username"
                  icon={FaUserTag}
                  disabled={true}
                  {...register('username')}
                />
                <InputField
                  label="Email Address"
                  type="email"
                  icon={HiEnvelope}
                  disabled={!isEditing}
                  {...register('email', { required: "Email is required" })}
                  error={errors.email?.message}
                />
              </div>
            </div>

            {/* Section: Role */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-purple-600 rounded-full"></div>
                <h3 className="text-xs font-black text-purple-600 uppercase tracking-[0.2em]">Authority & Role</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-800 ml-1">System Role</label>
                  <div className="relative">
                    <select
                      {...register('role')}
                      disabled={true}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none transition-all disabled:opacity-50 appearance-none cursor-pointer"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      ▼
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Danger Zone (Lock Account) */}
            {data?.data.id !== currentUser?.id && (
              <div className="pt-4">
                <div className={`p-6 rounded-3xl border flex items-center justify-between transition-all ${data?.data.isLocked ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'
                  }`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-white shadow-sm ${data?.data.isLocked ? 'text-amber-600' : 'text-red-600'
                      }`}>
                      {data?.data.isLocked ? <HiLockOpen size={24} /> : <HiLockClosed size={24} />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-black uppercase tracking-tight ${data?.data.isLocked ? 'text-amber-900' : 'text-red-900'
                        }`}>
                        {data?.data.isLocked ? 'Account Suspended' : 'Access Control'}
                      </h4>
                      <p className="text-[11px] font-bold text-gray-500 mt-0.5">
                        {data?.data.isLocked
                          ? 'This user currently cannot login to the system.'
                          : 'Temporarily disable this user access rights.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleToggleLock}
                    className={`cursor-pointer px-6 py-2.5 text-xs font-black rounded-xl transition-all border bg-white shadow-sm ${data?.data.isLocked
                      ? 'text-amber-600 border-amber-200 hover:bg-amber-600 hover:text-white'
                      : 'text-red-600 border-red-200 hover:bg-red-600 hover:text-white'
                      }`}
                  >
                    {data?.data.isLocked ? "RESTORE ACCESS" : "DEACTIVATE USER"}
                  </button>
                </div>
              </div>
            )}
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
