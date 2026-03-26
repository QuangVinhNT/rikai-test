import { AdminGuard, AdminHeader, Sidebar } from '@/components/layout';
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
              <div className="ml-64 h-screen flex flex-col overflow-hidden bg-gray-50">
                <div className="p-4 pb-0 shrink-0">
                  {/* Top Header UI */}
                  <AdminHeader />
                </div>
                {/* Nội dung trang con (page.tsx) sẽ hiển thị ở đây */}
                <main className="flex-1 overflow-hidden p-4 min-h-0">
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
