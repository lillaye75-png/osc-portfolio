"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  projectType: z.string().min(1, "Sélectionnez un type de projet"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  { value: "residentiel", label: "Résidentiel" },
  { value: "commercial", label: "Commercial" },
  { value: "institutionnel", label: "Institutionnel" },
  { value: "renovation", label: "Rénovation" },
  { value: "autre", label: "Autre" },
];

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      setIsSuccess(true);
      reset();
    } catch {
      setIsSuccess(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm bg-green-50 p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 font-serif text-2xl font-bold text-green-800">Message envoyé !</h3>
        <p className="mb-6 text-sm text-green-600">
          Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSuccess(false)}
          className="border-green-500 text-green-700 hover:bg-green-100"
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="name"
          label="Nom complet"
          placeholder="Votre nom"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="vous@exemple.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="phone"
          label="Téléphone"
          type="tel"
          placeholder="+221 77 123 45 67"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Select
          id="projectType"
          label="Type de projet"
          placeholder="Sélectionnez..."
          options={projectTypes}
          error={errors.projectType?.message}
          {...register("projectType")}
        />
      </div>

      <Textarea
        id="message"
        label="Message"
        placeholder="Décrivez votre projet en quelques lignes..."
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
        Envoyer le message
      </Button>
    </form>
  );
}
