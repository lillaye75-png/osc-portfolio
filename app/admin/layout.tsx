import { Inter } from "next/font/google";
import AdminSidebar from "@/components/admin/AdminSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Admin — OSC" };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <AdminSidebar />
      <main className="flex-1 bg-off-white p-4 lg:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
