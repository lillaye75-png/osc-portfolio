import PageTransition from "@/components/motion/PageTransition";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-gold">
              Prenez Contact
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              Contactez-Nous
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-500">
              Vous avez un projet en tête&nbsp;? Remplissez le formulaire ci-dessous et notre
              équipe vous répondra sous 24h.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
