import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminGuard({ children }: { children: React.ReactNode; }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const role = cookieStore.get('userRole')?.value;
  if (!token) {
    redirect('/login');
  };
  if (role !== 'ADMIN') {
    redirect('/');
  };
  return <>{children}</>;
}
