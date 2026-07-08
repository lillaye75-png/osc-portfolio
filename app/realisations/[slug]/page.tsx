import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Ruler, Calendar, Coins } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import PageTransition from "@/components/motion/PageTransition";
import { CtaSection } from "@/components/sections/CtaSection";
import { projects as staticProjects } from "@/lib/data";

const categoryLabels: Record<string, string> = {
  residential: "Résidentiel",
  commercial: "Commercial",
  institutional: "Institutionnel",
};

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase.from("projects").select("slug");
    if (data && data.length > 0) return data.map((p) => ({ slug: p.slug }));
  }
  return staticProjects.map((p) => ({ slug: p.slug }));
}

function parseResults(results: string | string[] | null): string[] {
  if (!results) return [];
  if (Array.isArray(results)) return results;
  try { return JSON.parse(results); } catch { return results.split("\n").filter(Boolean); }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project: any = null;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();
    project = data;
  }

  if (!project) {
    project = staticProjects.find((p) => p.slug === slug) || null;
  }

  if (!project) notFound();

  const projectImages: string[] = typeof project.images === "string"
    ? (() => { try { return JSON.parse(project.images); } catch { return []; } })()
    : (project.images || []);

  return (
    <PageTransition>
      <div className="aspect-[2/1] w-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />

      <section className="-mt-20 relative z-10 mx-auto max-w-5xl rounded-t-2xl bg-white px-4 pt-10 sm:px-8 lg:px-12">
        <div className="mb-8">
          <Link
            href="/realisations"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Retour aux réalisations
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold-dark capitalize">
              {categoryLabels[project.category] || project.category}
            </span>
            <span className="text-sm text-gray-400">{project.location}</span>
            <span className="text-sm text-gray-400">&bull;</span>
            <span className="text-sm text-gray-400">{project.year}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            {project.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            {project.description}
          </p>
        </div>

        <div className="mb-12 grid gap-6 rounded-xl bg-off-white p-6 sm:grid-cols-3">
          {project.surface && (
            <div className="flex items-center gap-3">
              <Ruler className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Surface
                </p>
                <p className="font-semibold text-charcoal">{project.surface}</p>
              </div>
            </div>
          )}
          {project.duration && (
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Durée
                </p>
                <p className="font-semibold text-charcoal">{project.duration}</p>
              </div>
            </div>
          )}
          {project.budget && (
            <div className="flex items-center gap-3">
              <Coins className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Budget
                </p>
                <p className="font-semibold text-charcoal">{project.budget}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-12 space-y-10">
          {project.challenge && (
            <div>
              <h2 className="mb-3 text-xl font-bold text-charcoal">Défi</h2>
              <p className="leading-relaxed text-gray-600">{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <h2 className="mb-3 text-xl font-bold text-charcoal">Solution</h2>
              <p className="leading-relaxed text-gray-600">{project.solution}</p>
            </div>
          )}
          {project.results && (
            <div>
              <h2 className="mb-3 text-xl font-bold text-charcoal">Résultats</h2>
              <ul className="space-y-2">
                {parseResults(project.results).map((r) => (
                  <li key={r} className="flex items-start gap-2 text-gray-600">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {projectImages.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-xl font-bold text-charcoal">Galerie</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {projectImages.map((img: string, i: number) => (
                <div
                  key={img}
                  className={`aspect-[4/3] w-full rounded-lg bg-gradient-to-br ${
                    i === 0
                      ? "from-gray-200 to-gray-300"
                      : i === 1
                        ? "from-gray-100 to-gray-200"
                        : i === 2
                          ? "from-gray-300 to-gray-400"
                          : "from-gray-200 to-gray-100"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-12 rounded-xl bg-off-white p-8 text-center sm:p-12">
          <h2 className="mb-3 text-2xl font-bold text-charcoal">
            Vous avez un projet similaire&nbsp;?
          </h2>
          <p className="mb-6 text-gray-500">
            Discutons de votre projet et trouvons ensemble la meilleure solution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-charcoal transition-all hover:bg-gold-light"
          >
            Discuter de votre projet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CtaSection />
    </PageTransition>
  );
}
