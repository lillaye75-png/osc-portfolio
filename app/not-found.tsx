import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-charcoal px-4 text-center">
      <p className="mb-2 font-serif text-[8rem] font-bold leading-none text-gold sm:text-[10rem]">
        404
      </p>
      <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Page introuvable</h1>
      <p className="mb-8 text-gray-400">Cette page a été déplacée ou n&apos;existe plus.</p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-charcoal transition-all hover:bg-gold-light"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/realisations"
          className="text-sm text-gray-400 underline-offset-4 hover:text-gold hover:underline"
        >
          Ou découvrez nos réalisations
        </Link>
      </div>
    </section>
  );
}
