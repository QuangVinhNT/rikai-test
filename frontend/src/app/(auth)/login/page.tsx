'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useLogin } from '@/hooks';
import { LoginType } from '@/types';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>();
  const [showPassword, setShowPassword] = useState(false);
  const {isLoading, loginUser} = useLogin();

  const onSubmit = async (formData: LoginType) => {
    loginUser(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-16 md:px-0 md:w-1/2">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <Link href={'/'} className='absolute top-4 left-4 flex items-center gap-2 hover:underline'><AiOutlineArrowLeft /> Back to Home</Link>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username or Email</label>
            <input
              {...register('username', { required: 'Required field' })}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username or email"
              disabled={isLoading}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                {...register('password', { required: 'Required field' })}
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 cursor-pointer ${isLoading && 'cursor-wait bg-gray-500! hover:bg-gray-500!'}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Do not have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
