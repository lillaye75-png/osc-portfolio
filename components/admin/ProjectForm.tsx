"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CloudinaryUpload from "./CloudinaryUpload";
import type { Project } from "@/lib/supabase/types";

type ProjectFormData = {
  title: string;
  slug: string;
  category: Project["category"];
  location: string;
  year: string;
  client: string;
  surface: string;
  duration: string;
  budget: string;
  status: Project["status"];
  featured: boolean;
  challenge: string;
  solution: string;
  results: string;
  description: string;
};

type Props = {
  initialData?: Project;
};

export default function ProjectForm({ initialData }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail ?? "");
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);

  const { register, setValue, handleSubmit, formState: { isSubmitting } } = useForm<ProjectFormData>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          category: initialData.category,
          location: initialData.location,
          year: initialData.year?.toString() ?? "",
          client: initialData.client ?? "",
          surface: initialData.surface ?? "",
          duration: initialData.duration ?? "",
          budget: initialData.budget ?? "",
          status: initialData.status,
          featured: initialData.featured,
          challenge: initialData.challenge ?? "",
          solution: initialData.solution ?? "",
          results: initialData.results ?? "",
          description: initialData.description ?? "",
        }
      : {
          title: "",
          slug: "",
          category: "residential",
          location: "",
          year: "",
          client: "",
          surface: "",
          duration: "",
          budget: "",
          status: "completed",
          featured: false,
          challenge: "",
          solution: "",
          results: "",
          description: "",
        },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setError("");
    const body = {
      ...data,
      year: data.year ? parseInt(data.year, 10) : null,
      thumbnail,
      images,
    };

    const res = await fetch(
      initialData ? `/api/admin/projects/${initialData.id}` : "/api/admin/projects",
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

    router.push("/admin/projects");
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
          <label className="block text-sm font-medium text-charcoal mb-1">Category *</label>
          <select {...register("category", { required: true })} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm">
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="institutional">Institutional</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Location *</label>
          <input {...register("location", { required: true })} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Year</label>
          <input type="number" {...register("year")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Client</label>
          <input {...register("client")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Surface</label>
          <input {...register("surface")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Duration</label>
          <input {...register("duration")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Budget</label>
          <input {...register("budget")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Status</label>
          <select {...register("status")} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm">
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Thumbnail</label>
        <CloudinaryUpload value={thumbnail ? [thumbnail] : []} onChange={(urls) => setThumbnail(urls[0] || "")} label="Upload Thumbnail" />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Gallery Images</label>
        <CloudinaryUpload value={images} onChange={setImages} multiple label="Upload Images" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("featured")} id="featured" className="rounded" />
        <label htmlFor="featured" className="text-sm font-medium text-charcoal">Featured project</label>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Description</label>
        <textarea {...register("description")} rows={3} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Challenge</label>
        <textarea {...register("challenge")} rows={3} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Solution</label>
        <textarea {...register("solution")} rows={3} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Results</label>
        <textarea {...register("results")} rows={3} className="w-full p-2.5 border border-charcoal/10 rounded-lg bg-white text-sm" />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold text-charcoal font-medium px-6 py-2.5 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Project" : "Create Project"}
        </button>
        <Link
          href="/admin/projects"
          className="bg-charcoal/10 text-charcoal font-medium px-6 py-2.5 rounded-lg hover:bg-charcoal/20 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
