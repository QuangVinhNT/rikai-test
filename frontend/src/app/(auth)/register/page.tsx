'use client';
import { useAuth } from '@/hooks/useAuth';
import { RegisterType } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerUser, isRegistering } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  });
  const password = watch('password');

  const onSubmit = (formData: RegisterType) => {
    registerUser(formData);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50/50 px-6 py-12 md:w-1/2 md:px-0">
      <div className="w-full max-w-[550px] rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Account</h1>
          <p className="mt-2 text-sm text-gray-500">Join us today! Please fill in your details.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                })}
                className={`w-full rounded-xl border bg-gray-50/30 px-4 py-3 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                  }`}
                placeholder="name@example.com"
                disabled={isRegistering}
              />
              {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.email.message}</p>}
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Username</label>
              <input
                type="text"
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Minimum 3 characters' }
                })}
                className={`w-full rounded-xl border bg-gray-50/30 px-4 py-3 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${errors.username ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                  }`}
                placeholder="johndoe"
                disabled={isRegistering}
              />
              {errors.username && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.username.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Minimum 8 characters' },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, message: 'Must be strong' }
                  })}
                  className={`w-full rounded-xl border bg-gray-50/30 px-4 py-3 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${errors.password ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                    }`}
                  placeholder="••••••••"
                  disabled={isRegistering}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1 leading-tight">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword', {
                    required: 'Confirm required',
                    validate: (value) => value === password || 'No match'
                  })}
                  className={`w-full rounded-xl border bg-gray-50/30 px-4 py-3 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500'
                    }`}
                  placeholder="••••••••"
                  disabled={isRegistering}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <button
            disabled={isRegistering}
            type="submit"
            className={`group relative flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none active:scale-[0.98] disabled:opacity-70 ${isRegistering ? 'cursor-wait' : 'cursor-pointer'
              }`}
          >
            {isRegistering ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
