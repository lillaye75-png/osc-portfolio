"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Service } from "@/lib/supabase/types";

type ServiceFormData = {
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  full_description: string;
  benefits: string;
  deliverables: string;
  process: string;
  display_order: string;
};

type Props = {
  initialData?: Service;
};

export default function ServiceForm({ initialData }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ServiceFormData>({
    defaultValues: initialData
      ? {
          ...initialData,
          benefits: initialData.benefits?.join("\n") ?? "",
          deliverables: initialData.deliverables?.join("\n") ?? "",
          process: initialData.process ? JSON.stringify(initialData.process, null, 2) : "",
          display_order: initialData.display_order?.toString() ?? "0",
          full_description: initialData.full_description ?? "",
        }
      : {
          title: "",
          slug: "",
          icon: "",
          short_description: "",
          full_description: "",
          benefits: "",
          deliverables: "",
          process: "",
          display_order: "0",
        },
  });

  const onSubmit = async (data: ServiceFormData) => {
    setError("");

    let parsedProcess: { step: string; description: string }[] = [];
    if (data.process) {
      try {
        parsedProcess = JSON.parse(data.process);
      } catch {
        setError("Process must be valid JSON (array of { step, description } objects)");
        return;
      }
    }

    const body = {
      ...data,
      benefits: data.benefits.split("\n").map((s) => s.trim()).filter(Boolean),
      deliverables: data.deliverables.split("\n").map((s) => s.trim()).filter(Boolean),
      process: parsedProcess,
      display_order: parseInt(data.display_order, 10) || 0,
      full_description: data.full_description || null,
    };

    const res = await fetch(
      initialData ? `/api/admin/services/${initialData.id}` : "/api/admin/services",
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

    router.push("/admin/services");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Title *</label>
          <input {...register("title", { required: true })} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Slug *</label>
          <input {...register("slug", { required: true })} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Icon (Lucide name)</label>
          <input {...register("icon", { required: true })} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Display Order</label>
          <input type="number" {...register("display_order")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Short Description *</label>
        <textarea {...register("short_description", { required: true })} rows={2} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Full Description</label>
        <textarea {...register("full_description")} rows={4} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Benefits (one per line)</label>
        <textarea {...register("benefits")} rows={4} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Deliverables (one per line)</label>
        <textarea {...register("deliverables")} rows={4} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Process (JSON array of &#123;step, description&#125;)</label>
        <textarea {...register("process")} rows={6} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm font-mono text-xs" />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold text-charcoal font-medium px-6 py-2.5 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Service" : "Create Service"}
        </button>
        <Link
          href="/admin/services"
          className="bg-charcoal/10 text-charcoal font-medium px-6 py-2.5 rounded-lg hover:bg-charcoal/20 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
