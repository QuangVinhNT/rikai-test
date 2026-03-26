import { AdminGuard, Sidebar } from '@/components/layout';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from 'sonner';
import '../globals.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AdminGuard>
            <div className="min-h-screen bg-gray-50">
              {/* Sidebar Component */}
              <Sidebar />

              {/* Main Content Area */}
              <div className="p-4 ml-64">
                {/* Top Header UI */}
                <header className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">Hệ thống quản trị</h2>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">Admin Name</p>
                      <p className="text-xs text-gray-500">Quản trị viên</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                  </div>
                </header>

                {/* Nội dung trang con (page.tsx) sẽ hiển thị ở đây */}
                <main>
                  {children}
                </main>
              </div>
            </div>
          </AdminGuard>
        </QueryProvider>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
