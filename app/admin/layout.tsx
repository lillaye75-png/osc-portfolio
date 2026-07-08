import { Inter } from "next/font/google";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Admin — OSC" };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(_cookiesToSet, _headers) {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/auth");
  }

  return (
    <div className={`${inter.className} flex min-h-screen`}>
      <AdminSidebar />
      <main className="flex-1 bg-off-white p-4 lg:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
