import { Toaster } from 'sonner';
import '../globals.css'
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
          {children}
        </section>
        <Toaster position='top-center'/>
      </body>
    </html>

  );
}
