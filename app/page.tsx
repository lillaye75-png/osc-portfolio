import { createClient } from "@supabase/supabase-js";
import PageTransition from "@/components/motion/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyOsc } from "@/components/sections/WhyOsc";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";
import { projects as staticProjects, services as staticServices, testimonials as staticTestimonials } from "@/lib/data";

export default async function Home() {
  let projects: any[] = staticProjects.slice(0, 3);
  let allServices: any[] = staticServices;
  let testimonials: any[] = staticTestimonials.map((t) => ({
    id: String(t.id),
    client_name: t.name,
    client_photo: null,
    role: t.role,
    project_type: null,
    project_ref: t.company,
    quote: t.quote,
    display_order: 0,
    created_at: new Date().toISOString(),
  }));

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: dbProjects } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3);
    if (dbProjects && dbProjects.length > 0) projects = dbProjects;

    const { data: dbServices } = await supabase
      .from("services")
      .select("*")
      .order("display_order");
    if (dbServices && dbServices.length > 0) allServices = dbServices;

    const { data: dbTestimonials } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order");
    if (dbTestimonials && dbTestimonials.length > 0) testimonials = dbTestimonials;
  }

  return (
    <>
      <PageTransition>
        <Hero />
      </PageTransition>
      <PageTransition>
        <FeaturedProjects projects={projects || []} />
      </PageTransition>
      <PageTransition>
        <ServicesOverview services={allServices || []} />
      </PageTransition>
      <PageTransition>
        <WhyOsc />
      </PageTransition>
      <PageTransition>
        <Testimonials testimonials={testimonials || []} />
      </PageTransition>
      <PageTransition>
        <CtaSection />
      </PageTransition>
    </>
  );
}
