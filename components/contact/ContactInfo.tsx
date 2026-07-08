"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-6 font-serif text-2xl font-bold text-charcoal">
          Informations de Contact
        </h3>

        <div className="space-y-6">
          <a
            href="tel:+221771234567"
            className="flex items-start gap-4 group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
              <Phone className="h-4 w-4 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal group-hover:text-gold transition-colors">
                +221 77 123 45 67
              </p>
              <p className="text-xs text-gray-500">Lun-Ven 8h00-18h00</p>
            </div>
          </a>

          <a
            href="mailto:contact@osc-senegal.com"
            className="flex items-start gap-4 group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
              <Mail className="h-4 w-4 text-gold" />
            </div>
            <div>
              <p className="text-sm text-charcoal group-hover:text-gold transition-colors">
                contact@osc-senegal.com
              </p>
              <p className="text-xs text-gray-500">Réponse sous 24h</p>
            </div>
          </a>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
              <MapPin className="h-4 w-4 text-gold" />
            </div>
            <div>
              <p className="text-sm text-charcoal">
                Dakar, Sénégal
              </p>
              <p className="text-xs text-gray-500">BP 12345 Dakar Fann</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
              <Clock className="h-4 w-4 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">Heures d&apos;ouverture</p>
              <p className="text-xs text-gray-500">
                Lun-Ven : 8h00 - 18h00<br />
                Sam : 9h00 - 13h00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button href="tel:+221771234567" variant="outline" size="md" className="border-gold text-gold hover:bg-gold hover:text-charcoal">
          <Phone className="h-4 w-4" />
          Appeler
        </Button>
        <Button href="https://wa.me/221771234567" variant="outline" size="md" className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white">
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-gray-200">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-charcoal-mid to-charcoal">
          <MapPin className="mb-2 h-8 w-8 text-gold" />
          <p className="font-sans text-sm font-medium text-white/80">
            Dakar, Sénégal
          </p>
          <p className="text-xs text-white/50">
            Carte interactive bientôt disponible
          </p>
        </div>
      </div>
    </div>
  );
}
