import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Admin — OSC" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/auth");

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <AdminSidebar />
      <main className="flex-1 bg-off-white p-4 lg:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
