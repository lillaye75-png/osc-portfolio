import PageTransition from "@/components/motion/PageTransition";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { createClient } from "@supabase/supabase-js";
import { projects as staticProjects } from "@/lib/data";

export default async function RealisationsPage() {
  let projects: any[] = staticProjects;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (data && data.length > 0) projects = data;
  }

  return (
    <PageTransition>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Notre Portfolio
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              Nos Réalisations
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
              Découvrez une sélection de nos projets récents, reflétant notre engagement pour
              l&apos;excellence et la qualité de fabrication.
            </p>
          </div>

          <ProjectGrid projects={projects || []} />
        </div>
      </section>
    </PageTransition>
  );
}
