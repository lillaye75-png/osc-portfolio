import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("joins class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters falsy values", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });

  it("returns empty string for no args", () => {
    expect(cn()).toBe("");
  });

  it("handles single class", () => {
    expect(cn("only-one")).toBe("only-one");
  });
});
