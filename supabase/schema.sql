-- Run this migration via: supabase migration new <name> && supabase db push
-- Or copy/paste into Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('residential', 'commercial', 'institutional')),
  location TEXT NOT NULL,
  year INTEGER,
  client TEXT,
  surface TEXT,
  duration TEXT,
  budget TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'ongoing')),
  featured BOOLEAN DEFAULT false,
  thumbnail TEXT,
  images JSONB DEFAULT '[]',
  challenge TEXT,
  solution TEXT,
  results TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  benefits JSONB DEFAULT '[]',
  process JSONB DEFAULT '[]',
  deliverables JSONB DEFAULT '[]',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_photo TEXT,
  role TEXT,
  project_type TEXT,
  project_ref TEXT,
  quote TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_display_order ON services(display_order);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects" ON projects FOR SELECT TO anon USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT TO anon USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT TO anon USING (true);
CREATE POLICY "Public insert contacts" ON contacts FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admin all projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin read contacts" ON contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update contacts" ON contacts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
