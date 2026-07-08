import { contactSchema } from "@/lib/schemas/contact";

describe("Contact form schema", () => {
  it("validates a correct submission", () => {
    const result = contactSchema.safeParse({
      name: "Amadou Diallo",
      email: "amadou@example.com",
      phone: "+221 77 123 45 67",
      projectType: "residential",
      message: "Je souhaite construire une villa.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing name", () => {
    const result = contactSchema.safeParse({
      email: "amadou@example.com",
      phone: "+221 77 123 45 67",
      projectType: "residential",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Amadou",
      email: "not-an-email",
      phone: "+221 77 123 45 67",
      projectType: "residential",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid project type", () => {
    const result = contactSchema.safeParse({
      name: "Amadou",
      email: "amadou@example.com",
      phone: "+221 77 123 45 67",
      projectType: "invalid-type",
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional message", () => {
    const result = contactSchema.safeParse({
      name: "Amadou Diallo",
      email: "amadou@example.com",
      phone: "+221 77 123 45 67",
      projectType: "commercial",
    });
    expect(result.success).toBe(true);
  });

  it("accepts all project types", () => {
    for (const type of ["residential", "commercial", "institutional", "other"]) {
      const result = contactSchema.safeParse({
        name: "Test",
        email: "test@test.com",
        phone: "+221 77 123 45 67",
        projectType: type,
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects empty name", () => {
    const result = contactSchema.safeParse({
      name: "A",
      email: "test@test.com",
      phone: "+221 77 123 45 67",
      projectType: "other",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message over 2000 characters", () => {
    const result = contactSchema.safeParse({
      name: "Amadou",
      email: "test@test.com",
      phone: "+221 77 123 45 67",
      projectType: "residential",
      message: "x".repeat(2001),
    });
    expect(result.success).toBe(false);
  });
});
