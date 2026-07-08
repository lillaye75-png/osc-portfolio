"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderOpen,
  Wrench,
  MessageSquareQuote,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/auth/logout", label: "Logout", icon: LogOut },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-charcoal text-gold p-2 rounded-md"
        aria-label="Toggle menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-charcoal text-off-white transform transition-transform duration-200 lg:relative lg:translate-x-0 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-charcoal-light">
          <Link href="/admin" className="text-xl font-bold text-gold">
            OSC Admin
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-gold/10 text-gold"
                    : "text-off-white/70 hover:bg-charcoal-light hover:text-off-white"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
