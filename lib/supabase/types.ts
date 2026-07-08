export type Project = {
  id: string;
  title: string;
  slug: string;
  category: "residential" | "commercial" | "institutional";
  location: string;
  year: number | null;
  client: string | null;
  surface: string | null;
  duration: string | null;
  budget: string | null;
  status: "completed" | "ongoing";
  featured: boolean;
  thumbnail: string | null;
  images: string[];
  challenge: string | null;
  solution: string | null;
  results: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  icon: string;
  short_description: string;
  full_description: string | null;
  benefits: string[];
  process: { step: string; description: string }[];
  deliverables: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  client_photo: string | null;
  role: string | null;
  project_type: string | null;
  project_ref: string | null;
  quote: string;
  display_order: number;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string | null;
  status: "unread" | "read" | "replied";
  created_at: string;
};
