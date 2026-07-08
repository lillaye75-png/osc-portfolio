import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Project } from "@/lib/supabase/types";

async function deleteProject(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createAdminClient();
  await supabase.from("projects").delete().eq("id", id);
}

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-gold text-charcoal font-medium px-4 py-2 rounded-lg hover:bg-gold-light transition-colors text-sm"
        >
          <Plus size={18} />
          New Project
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-charcoal/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-charcoal/60 border-b border-charcoal/5">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects && projects.length > 0 ? (
              projects.map((project: Project) => (
                <tr key={project.id} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.02]">
                  <td className="p-4 font-medium text-charcoal">{project.title}</td>
                  <td className="p-4 text-charcoal/70 capitalize">{project.category}</td>
                  <td className="p-4 text-charcoal/70">{project.location}</td>
                  <td className="p-4">
                    {project.featured ? (
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Featured
                      </span>
                    ) : (
                      <span className="text-charcoal/40">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-1.5 text-charcoal/60 hover:text-gold transition-colors"
                        aria-label="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
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
                  No projects yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
