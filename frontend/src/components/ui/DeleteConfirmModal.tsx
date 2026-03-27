import React from 'react';
import { HiExclamationTriangle, HiXMark } from 'react-icons/hi2';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, userName }: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop (Lớp phủ mờ) */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Nút X đóng nhanh */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <HiXMark size={24} />
        </button>

        <div className="p-8">
          {/* Icon Cảnh báo */}
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
            <HiExclamationTriangle size={32} />
          </div>

          {/* Nội dung văn bản */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              Confirm Deletion
            </h3>
            <p className="text-sm font-medium text-gray-500 leading-relaxed px-4">
              Are you sure you want to delete <span className="text-gray-900 font-bold">{userName}</span>?
              This action cannot be undone and all associated data will be lost.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
            >
              No, Keep User
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3.5 rounded-xl text-sm font-black text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95 cursor-pointer"
            >
              Yes, Delete User
            </button>
          </div>
        </div>

        {/* Trang trí phía dưới */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Admin Security Protocol
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
