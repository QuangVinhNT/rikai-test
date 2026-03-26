'use client';
import { useAuth } from '@/hooks';
import { LoginType } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, loginUser } = useAuth();

  const onSubmit = async (formData: LoginType) => {
    loginUser(formData);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50/50 px-6 py-12 md:w-1/2 md:px-0">
      <div className="w-full max-w-[440px] rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

        {/* Back Button */}
        <Link
          href={'/'}
          className="group absolute -top-12 left-0 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 md:left-4 md:top-8"
        >
          <AiOutlineArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-500">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Username or Email
            </label>
            <input
              {...register('username', { required: 'Required field' })}
              type="text"
              className={`w-full rounded-xl border bg-gray-50/30 px-4 py-3 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${errors.username ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                }`}
              placeholder="name@example.com"
              disabled={isLoggingIn}
            />
            {errors.username && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.username.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <Link href="#" className="text-xs font-medium text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <input
                {...register('password', { required: 'Required field' })}
                type={showPassword ? 'text' : 'password'}
                className={`w-full rounded-xl border bg-gray-50/30 px-4 py-3 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${errors.password ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                  }`}
                placeholder="••••••••"
                disabled={isLoggingIn}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`group relative flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none active:scale-[0.98] disabled:opacity-70 ${isLoggingIn ? 'cursor-wait' : 'cursor-pointer'
              }`}
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
