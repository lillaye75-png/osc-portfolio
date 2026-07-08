import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Contact } from "@/lib/supabase/types";

async function updateContactStatus(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const supabase = createAdminClient();
  await supabase.from("contacts").update({ status }).eq("id", id);
}

export default async function ContactsPage() {
  const supabase = await createClient();
  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Contacts</h1>
      </div>

      <div className="space-y-3">
        {contacts && contacts.length > 0 ? (
          contacts.map((contact: Contact) => (
            <details
              key={contact.id}
              className={cn(
                "bg-white rounded-xl shadow-sm border border-charcoal/5 group",
                contact.status === "unread" && "border-l-4 border-l-red-400 bg-red-50/30"
              )}
            >
              <summary className="p-4 cursor-pointer list-none flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-5 gap-2 text-sm items-center">
                  <span className="font-medium text-charcoal truncate">{contact.name}</span>
                  <span className="text-charcoal/70 truncate">{contact.email}</span>
                  <span className="text-charcoal/70 truncate">{contact.phone}</span>
                  <span className="text-charcoal/70 capitalize truncate">{contact.project_type}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-block px-2 py-1 rounded-full text-xs font-medium",
                        contact.status === "unread"
                          ? "bg-red-100 text-red-700"
                          : contact.status === "read"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      )}
                    >
                      {contact.status}
                    </span>
                    <span className="text-charcoal/40 text-xs">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </summary>

              <div className="px-4 pb-4 border-t border-charcoal/5 pt-3">
                <p className="text-sm text-charcoal/80 whitespace-pre-wrap mb-4">
                  {contact.message || "(No message)"}
                </p>

                <div className="flex gap-2">
                  {contact.status !== "read" && (
                    <form action={updateContactStatus}>
                      <input type="hidden" name="id" value={contact.id} />
                      <input type="hidden" name="status" value="read" />
                      <button
                        type="submit"
                        className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg hover:bg-yellow-200 transition-colors font-medium"
                      >
                        Mark as Read
                      </button>
                    </form>
                  )}
                  {contact.status !== "replied" && (
                    <form action={updateContactStatus}>
                      <input type="hidden" name="id" value={contact.id} />
                      <input type="hidden" name="status" value="replied" />
                      <button
                        type="submit"
                        className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors font-medium"
                      >
                        Mark as Replied
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </details>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center text-charcoal/40 shadow-sm border border-charcoal/5">
            No contacts yet
          </div>
        )}
      </div>
    </div>
  );
}
