'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  HiLockClosed,
  HiShieldCheck,
  HiEye,
  HiEyeSlash,
  HiCheckBadge
} from 'react-icons/hi2';
import Link from 'next/link';
import { useUser } from '@/hooks';
import { userStore } from '@/stores';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// --- 1. Reusable Password Input ---
interface PasswordInputProps {
  label: string;
  error?: string;
  register: any;
  placeholder?: string;
}

const PasswordField = ({ label, error, register, placeholder }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
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
          <HiLockClosed size={18} />
        </div>

        <input
          type={show ? "text" : "password"}
          {...register}
          placeholder={placeholder}
          className={`w-full pl-11 pr-12 py-3.5 rounded-xl border font-bold text-sm transition-all outline-none 
            ${error
              ? 'border-red-200 bg-red-50/20 focus:ring-4 focus:ring-red-50 focus:border-red-400'
              : 'border-gray-100 bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400'
            }`}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
        >
          {show ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
        </button>
      </div>
    </div>
  );
};

// --- 2. Main Page Component ---
export default function ChangePasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });
  const { updateUser } = useUser();
  const { user } = userStore();

  const onSubmit = (formData: { newPassword: string, confirmPassword: string; }) => {
    try {
      if (user) {
        updateUser({ id: user.id, payload: { password: formData.newPassword } }, {
          onSuccess: () => {
            router.back();
          }
        });
      }
    } catch (error) {
      toast.error('Action failed');
    }
  };

  return (
    <div className="h-full max-w-2xl mx-auto flex flex-col p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">Security Setting</h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">
          Update your account authentication
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <HiShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase">Change Password</h3>
              <p className="text-xs font-bold text-gray-400">Ensure your account is using a long, random password to stay secure.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <PasswordField
              label="New Password"
              placeholder="••••••••"
              register={register('newPassword', {
                required: 'New password is required',
                minLength: { value: 8, message: 'Too short (min 8)' },
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, message: 'Must have UPPERCASE, lowercase, number and symbol' }
              })}
              error={errors.newPassword?.message}
            />

            <PasswordField
              label="Confirm New Password"
              placeholder="Repeat new password"
              register={register('confirmPassword', {
                required: 'Please confirm password',
                validate: (val: string) => {
                  if (watch('newPassword') !== val) {
                    return "Passwords do not match";
                  }
                }
              })}
              error={errors.confirmPassword?.message}
            />

            <div className="pt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <HiCheckBadge size={20} />
                <span className="text-[11px] font-black uppercase tracking-wider">End-to-end encrypted</span>
              </div>

              <button
                type="submit"
                className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-blue-600 shadow-xl shadow-gray-200 transition-all active:scale-95 cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50/80 px-8 py-5 border-t border-gray-100">
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
            <b>Note:</b> After changing your password, you might be required to log in again on all your active devices for security purposes.
          </p>
        </div>
      </div>

      <Link
        href="/me"
        className="mt-8 text-center text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors"
      >
        Cancel and return to Profile
      </Link>
    </div>
  );
}
