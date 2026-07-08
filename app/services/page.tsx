import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageTransition from "@/components/motion/PageTransition";
import { ServiceCard } from "@/components/services/ServiceCard";
import { createClient } from "@supabase/supabase-js";
import { services as staticServices } from "@/lib/data";

export default async function ServicesPage() {
  let services: any[] = staticServices;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data } = await supabase
      .from("services")
      .select("*")
      .order("display_order");
    if (data && data.length > 0) services = data;
  }

  return (
    <PageTransition>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Notre Expertise
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              Nos Services
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
              De la conception à la livraison, nous vous accompagnons à chaque étape de votre
              projet de construction avec une expertise complète et des solutions sur mesure.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(services || []).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-20 rounded-xl bg-off-white p-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-charcoal">
              Vous ne trouvez pas ce que vous cherchez&nbsp;?
            </h2>
            <p className="mb-6 text-gray-500">
              Chaque projet est unique. Contactez-nous pour discuter de vos besoins
              spécifiques.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-base font-semibold text-charcoal transition-all hover:bg-gold-light"
            >
              Contactez-nous
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
