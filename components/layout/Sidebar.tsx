"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  FileText,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Habits",
    href: "/habits",
    icon: CheckSquare,
  },
  {
    name: "Weekly Reports",
    href: "/weekly-reports",
    icon: FileText,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 min-h-screen p-6 hidden md:block shadow-sm">
      <h1 className="text-3xl font-bold mb-10">
        Momentum
      </h1>

      <nav className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-violet-100 transition text-slate-700 font-medium"
            >
              <Icon size={20} />

              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}