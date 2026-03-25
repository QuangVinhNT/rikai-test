'use client';
import { useAuth } from '@/hooks/useAuth';
import { userStore } from '@/stores';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  username: string;
  email: string;
  fullName: string;
}

export default function Me() {
  const { user } = userStore();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      username: user?.username || '',
      email: 'example@gmail.com',
      fullName: 'Example User',
    }
  });
  const {logoutUser, isLoggingOut} = useAuth()

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: 'example@gmail.com',
        fullName: 'Example User',
      });
    }
  }, [user, reset]);

  const onSubmit = (data: IFormInput) => {
    console.log("Dữ liệu gửi đi:", data);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logoutUser()
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500">Manage your profile information and security</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CỘT TRÁI: AVATAR CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full bg-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{user?.username}</h2>
              <p className="text-sm text-gray-500 mb-6">{'example@gmail.com'}</p>
              
              <div className="flex flex-col gap-2">
                <button type="button" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all">
                  Upload New Photo
                </button>
              </div>
            </div>
            <button 
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 border border-red-600 text-white rounded-2xl text-sm font-semibold hover:bg-red-50 hover:text-red-600 transition-all shadow-sm mt-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>

          {/* CỘT PHẢI: CHI TIẾT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
                {!isEditing && (
                  <button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-indigo-600 font-medium hover:text-indigo-700 text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>

              <div className="p-6 space-y-6">
                {/* Full Name - 1 dòng */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    {...register("fullName")}
                    disabled={!isEditing}
                    className={`w-full p-2.5 border rounded-lg outline-none transition-all ${
                      isEditing ? 'border-indigo-500 bg-white shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-500'
                    }`}
                  />
                </div>

                {/* Username & Email - Chung 1 dòng (Grid 2 cột) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <input 
                      {...register("username")}
                      disabled={!isEditing}
                      className={`w-full p-2.5 border rounded-lg outline-none transition-all ${
                        isEditing ? 'border-indigo-500 bg-white shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-500'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      {...register("email")}
                      disabled={!isEditing}
                      className={`w-full p-2.5 border rounded-lg outline-none transition-all ${
                        isEditing ? 'border-indigo-500 bg-white shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Khu vực nút Save / Cancel */}
              {isEditing && (
                <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset(); // Khôi phục lại dữ liệu ban đầu
                    }}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Security</h3>
                <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
              </div>
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
