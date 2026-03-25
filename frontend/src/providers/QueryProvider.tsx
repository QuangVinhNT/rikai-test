'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Khởi tạo QueryClient trong useState để tránh việc tạo mới 
  // mỗi khi Server Component cha render lại
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Cấu hình mặc định nếu bạn muốn (ví dụ: không tự refetch khi chuyển tab)
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
