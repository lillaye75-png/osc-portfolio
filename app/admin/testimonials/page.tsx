import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Testimonial } from "@/lib/supabase/types";

async function deleteTestimonial(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createAdminClient();
  await supabase.from("testimonials").delete().eq("id", id);
}

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 bg-gold text-charcoal font-medium px-4 py-2 rounded-lg hover:bg-gold-light transition-colors text-sm"
        >
          <Plus size={18} />
          New Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-charcoal/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-charcoal/60 border-b border-charcoal/5">
              <th className="p-4 font-medium">Client Name</th>
              <th className="p-4 font-medium">Quote</th>
              <th className="p-4 font-medium">Project Type</th>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((t: Testimonial) => (
                <tr key={t.id} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02]">
                  <td className="p-4 font-medium text-charcoal">{t.client_name}</td>
                  <td className="p-4 text-charcoal/70 max-w-xs truncate">
                    {t.quote.length > 50 ? `${t.quote.slice(0, 50)}…` : t.quote}
                  </td>
                  <td className="p-4 text-charcoal/70">{t.project_type ?? "—"}</td>
                  <td className="p-4 text-charcoal/70">{t.display_order}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/testimonials/${t.id}/edit`}
                        className="p-1.5 text-charcoal/60 hover:text-gold transition-colors"
                        aria-label="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <form action={deleteTestimonial}>
                        <input type="hidden" name="id" value={t.id} />
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
                <td colSpan={5} className="p-8 text-center text-charcoal/40">
                  No testimonials yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
