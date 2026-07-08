import PageTransition from "@/components/motion/PageTransition";
import { CtaSection } from "@/components/sections/CtaSection";
import { stats } from "@/lib/data";
import { Shield, Target, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Mission",
    description:
      "Offrir des solutions architecturales et de construction innovantes, durables et adaptées aux besoins spécifiques de chaque client, tout en respectant les normes les plus exigeantes.",
  },
  {
    icon: Target,
    title: "Vision",
    description:
      "Devenir la référence en matière d'architecture et de construction au Sénégal, en alliant tradition artisanale et technologies modernes pour bâtir un cadre de vie exceptionnel.",
  },
  {
    icon: Heart,
    title: "Valeurs",
    description:
      "Excellence, intégrité, innovation et engagement client sont au cœur de chaque projet. Nous croyons en une construction responsable qui respecte l'environnement et les communautés.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Qui Sommes-Nous
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              À Propos
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
              Découvrez l&apos;histoire et les valeurs d&apos;Oscar Sénégal Construction, votre
              partenaire de confiance pour tous vos projets de construction au Sénégal.
            </p>
          </div>

          <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
            <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-gold/20 via-gold/10 to-charcoal/10" />
            <div>
              <h2 className="mb-4 text-2xl font-bold text-charcoal">
                Une Histoire d&apos;Excellence
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  Fondé à Dakar, Oscar Sénégal Construction est né de la passion pour
                  l&apos;architecture et la construction de qualité. Forts de plus de 12 ans
                  d&apos;expérience, nous avons bâti notre réputation sur l&apos;excellence, la
                  fiabilité et l&apos;innovation.
                </p>
                <p>
                  Chaque projet est pour nous une opportunité de créer des espaces qui
                  transcendent les attentes. Que ce soit pour une villa résidentielle, un
                  immeuble commercial ou un centre institutionnel, nous appliquons les mêmes
                  standards d&apos;exigence et de qualité.
                </p>
                <p>
                  Notre équipe pluridisciplinaire d&apos;architectes, d&apos;ingénieurs et de
                  techniciens travaille en synergie pour offrir un service complet, de la
                  conception à la livraison finale.
                </p>
              </div>
            </div>
          </div>

          <hr className="mb-20 border-gray-200" />

          <div className="mb-20 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                  <v.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-charcoal">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{v.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-gold sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </PageTransition>
  );
}
