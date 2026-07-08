import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Edit Testimonial</h1>
      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
