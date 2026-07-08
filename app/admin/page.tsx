import { createClient } from "@/lib/supabase/server";
import { FolderOpen, Wrench, MessageSquareQuote, Mail } from "lucide-react";
import Link from "next/link";
import type { Contact } from "@/lib/supabase/types";

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  href: string;
};

function StatCard({ label, value, icon, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-6 shadow-sm border border-charcoal/5 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className="p-3 rounded-lg bg-gold/10 text-gold">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-charcoal">{value}</p>
        <p className="text-sm text-charcoal/60">{label}</p>
      </div>
    </Link>
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: projects }, { count: services }, { count: testimonials }, { data: contacts }] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const unreadCount = contacts?.filter((c) => c.status === "unread").length ?? 0;
  const totalContacts = contacts?.length ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Projects"
          value={projects ?? 0}
          icon={<FolderOpen size={24} />}
          href="/admin/projects"
        />
        <StatCard
          label="Total Services"
          value={services ?? 0}
          icon={<Wrench size={24} />}
          href="/admin/services"
        />
        <StatCard
          label="Testimonials"
          value={testimonials ?? 0}
          icon={<MessageSquareQuote size={24} />}
          href="/admin/testimonials"
        />
        <StatCard
          label="Unread Contacts"
          value={unreadCount}
          icon={<Mail size={24} />}
          href="/admin/contacts"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-charcoal/5">
        <div className="p-6 border-b border-charcoal/5">
          <h2 className="text-lg font-semibold text-charcoal">Recent Contacts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal/60 border-b border-charcoal/5">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Project Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact: Contact) => (
                  <tr
                    key={contact.id}
                    className={`border-b border-charcoal/5 last:border-0 ${contact.status === "unread" ? "bg-gold/5" : ""}`}
                  >
                    <td className="p-4 font-medium text-charcoal">{contact.name}</td>
                    <td className="p-4 text-charcoal/70">{contact.email}</td>
                    <td className="p-4 text-charcoal/70 capitalize">{contact.project_type}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          contact.status === "unread"
                            ? "bg-red-100 text-red-700"
                            : contact.status === "read"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4 text-charcoal/60">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-charcoal/40">
                    No contacts yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
