import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase.from("services").select("*").eq("id", id).single();

  if (!service) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Edit Service</h1>
      <ServiceForm initialData={service} />
    </div>
  );
}
