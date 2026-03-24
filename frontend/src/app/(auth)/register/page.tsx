'use client';
import { useRegister } from '@/hooks/useRegister';
import { RegisterType } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'sonner';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, error, registerUser } = useRegister();
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full px-16 md:px-0 md:w-1/2">
      <Link href={'/'} className='absolute top-4 left-4 flex items-center gap-2 hover:underline'><AiOutlineArrowLeft /> Back to Home</Link>
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" disabled={isLoading}/>
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input type="text" {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Minimum 3 characters' } })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your username" disabled={isLoading}/>
              {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type={showPassword ? "text" : "password"} {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, message: 'Must contain uppercase, lowercase, number, and special character' } })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" disabled={isLoading}/>
              <button type="button" className="absolute right-3 top-8 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input type={showConfirmPassword ? "text" : "password"} {...register('confirmPassword', { required: 'Confirm password is required', validate: (value) => value === password || 'Passwords do not match' })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm your password" disabled={isLoading}/>
              <button type="button" className="absolute right-3 top-8 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>
          </div>

          <button disabled={isLoading} type="submit" className={`w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 cursor-pointer ${isLoading && 'cursor-wait bg-gray-500! hover:bg-gray-500!'}`}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
