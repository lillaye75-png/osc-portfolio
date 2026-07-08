import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import PageTransition from "@/components/motion/PageTransition";
import { services as staticServices } from "@/lib/data";

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase.from("services").select("slug");
    if (data && data.length > 0) return data.map((s) => ({ slug: s.slug }));
  }
  return staticServices.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let service: any = null;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .single();
    service = data;
  }

  if (!service) {
    service = staticServices.find((s) => s.slug === slug) || null;
  }

  if (!service) notFound();

  return (
    <PageTransition>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Retour aux services
          </Link>

          <h1 className="mb-6 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            {service.title}
          </h1>

          <p className="mb-12 text-lg leading-relaxed text-gray-600">
            {service.full_description || service.short_description}
          </p>

          <div className="mb-16">
            <h2 className="mb-6 text-xl font-bold text-charcoal">Avantages</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {(service.benefits || []).map((b: string) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-gray-600">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-xl font-bold text-charcoal">Notre Processus</h2>
            <div className="space-y-6">
              {(service.process || []).map((step: { step: string; description: string }, i: number) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal">{step.step}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-xl font-bold text-charcoal">Livrables</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {(service.deliverables || []).map((d: string) => (
                <li
                  key={d}
                  className="rounded-lg border border-gray-100 bg-off-white px-4 py-3 text-sm text-gray-600"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-charcoal p-8 text-center sm:p-12">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Intéressé par ce service&nbsp;?
            </h2>
            <p className="mb-6 text-gray-400">
              Demandez un devis personnalisé pour votre projet.
            </p>
            <Link
              href={`/contact?service=${service.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-charcoal transition-all hover:bg-gold-light"
            >
              Demander un devis pour ce service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
