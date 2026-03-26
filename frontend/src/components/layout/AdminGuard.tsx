import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminGuard({ children }: { children: React.ReactNode; }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const role = cookieStore.get('userRole')?.value;
  if (!refreshToken && !accessToken) {
    redirect('/login');
  };
  if (role !== 'ADMIN') {
    redirect('/');
  };
  return <>{children}</>;
}
