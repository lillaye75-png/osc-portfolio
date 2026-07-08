"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CloudinaryUpload from "./CloudinaryUpload";
import type { Testimonial } from "@/lib/supabase/types";

type TestimonialFormData = {
  client_name: string;
  client_photo: string;
  role: string;
  project_type: string;
  project_ref: string;
  quote: string;
  display_order: string;
};

type Props = {
  initialData?: Testimonial;
};

export default function TestimonialForm({ initialData }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [clientPhoto, setClientPhoto] = useState(initialData?.client_photo ?? "");

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<TestimonialFormData>({
    defaultValues: initialData
      ? {
          ...initialData,
          client_photo: initialData.client_photo ?? "",
          role: initialData.role ?? "",
          project_type: initialData.project_type ?? "",
          project_ref: initialData.project_ref ?? "",
          display_order: initialData.display_order?.toString() ?? "0",
        }
      : {
          client_name: "",
          client_photo: "",
          role: "",
          project_type: "",
          project_ref: "",
          quote: "",
          display_order: "0",
        },
  });

  const onSubmit = async (data: TestimonialFormData) => {
    setError("");

    const body = {
      ...data,
      client_photo: clientPhoto || null,
      role: data.role || null,
      project_type: data.project_type || null,
      project_ref: data.project_ref || null,
      display_order: parseInt(data.display_order, 10) || 0,
    };

    const res = await fetch(
      initialData ? `/api/admin/testimonials/${initialData.id}` : "/api/admin/testimonials",
      {
        method: initialData ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const json = await res.json();
      setError(json.error ?? "Something went wrong");
      return;
    }

    router.push("/admin/testimonials");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Client Name *</label>
          <input {...register("client_name", { required: true })} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Display Order</label>
          <input type="number" {...register("display_order")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Client Photo</label>
          <CloudinaryUpload value={clientPhoto ? [clientPhoto] : []} onChange={(urls) => setClientPhoto(urls[0] || "")} label="Upload Photo" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Role</label>
          <input {...register("role")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Project Type</label>
          <input {...register("project_type")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Project Ref</label>
          <input {...register("project_ref")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Quote *</label>
        <textarea {...register("quote", { required: true })} rows={4} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold text-charcoal font-medium px-6 py-2.5 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Testimonial" : "Create Testimonial"}
        </button>
        <Link
          href="/admin/testimonials"
          className="bg-charcoal/10 text-charcoal font-medium px-6 py-2.5 rounded-lg hover:bg-charcoal/20 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
