import Link from "next/link";
import PageTransition from "@/components/motion/PageTransition";

export default function MentionsLegalesPage() {
  return (
    <PageTransition>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark"
          >
            ← Retour à l'accueil
          </Link>

          <h1 className="mb-8 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Mentions Légales
          </h1>

          <div className="space-y-6 text-sm leading-relaxed text-gray-600">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-charcoal">1. Édition du site</h2>
              <p>
                Oscar Sénégal Construction (OSC)
                <br />
                Dakar, Sénégal
                <br />
                Email : contact@osc-senegal.com
                <br />
                Téléphone : +221 77 123 45 67
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-charcoal">2. Directeur de la publication</h2>
              <p>Oscar Sénégal Construction</p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-charcoal">3. Hébergement</h2>
              <p>
                Ce site est hébergé par Vercel Inc.
                <br />
                340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-charcoal">
                4. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble des contenus de ce site (textes, images, vidéos, logos) est la propriété
                exclusive d'Oscar Sénégal Construction. Toute reproduction, distribution ou
                exploitation non autorisée est interdite.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-charcoal">
                5. Protection des données
              </h2>
              <p>
                Les informations collectées via le formulaire de contact sont utilisées uniquement
                pour traiter votre demande. Conformément à la réglementation en vigueur, vous
                disposez d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-charcoal">6. Responsabilité</h2>
              <p>
                Oscar Sénégal Construction s'efforce d'assurer l'exactitude des informations
                publiées sur ce site mais ne saurait être tenu responsable des erreurs, omissions
                ou dommages résultant de leur utilisation.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
