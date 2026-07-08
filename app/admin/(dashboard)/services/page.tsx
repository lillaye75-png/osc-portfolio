import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Service } from "@/lib/supabase/types";

async function deleteService(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createAdminClient();
  await supabase.from("services").delete().eq("id", id);
}

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Services</h1>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 bg-gold text-charcoal font-medium px-4 py-2 rounded-lg hover:bg-gold-light transition-colors text-sm"
        >
          <Plus size={18} />
          New Service
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-charcoal/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-charcoal/60 border-b border-charcoal/5">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Icon</th>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services && services.length > 0 ? (
              services.map((service: Service) => (
                <tr key={service.id} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02]">
                  <td className="p-4 font-medium text-charcoal">{service.title}</td>
                  <td className="p-4 text-charcoal/70 font-mono text-xs">{service.icon}</td>
                  <td className="p-4 text-charcoal/70">{service.display_order}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="p-1.5 text-charcoal/60 hover:text-gold transition-colors"
                        aria-label="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <form action={deleteService}>
                        <input type="hidden" name="id" value={service.id} />
                        <button
                          type="submit"
                          onClick={(e) => { if (!confirm("Are you sure?")) e.preventDefault(); }}
                          className="p-1.5 text-charcoal/60 hover:text-red-600 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-charcoal/40">
                  No services yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
