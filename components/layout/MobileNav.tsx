"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
} from "lucide-react";

export default function MobileNav() {
  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white/90
        backdrop-blur-xl
        border-t
        border-slate-200
        flex
        justify-around
        items-center
        py-4
        md:hidden
        z-50
      "
    >
      <Link
        href="/dashboard"
        className="flex flex-col items-center text-slate-600"
      >
        <LayoutDashboard size={24} />

        <span className="text-xs mt-1">
          Dashboard
        </span>
      </Link>

      <Link
        href="/habits"
        className="flex flex-col items-center text-slate-600"
      >
        <CheckSquare size={24} />

        <span className="text-xs mt-1">
          Habits
        </span>
      </Link>

      <Link
        href="/weekly-reports"
        className="flex flex-col items-center text-slate-600"
      >
        <BarChart3 size={24} />

        <span className="text-xs mt-1">
          Reports
        </span>
      </Link>
    </div>
  );
}