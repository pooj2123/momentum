"use client";

import { Habit } from "@/types/habit";

import {
  Check,
  Trash2,
  Flame,
} from "lucide-react";

interface Props {
  habit: Habit;

  onToggle: (id: string) => void;

  onDelete: (id: string) => void;
}

export default function HabitCard({
  habit,
  onToggle,
  onDelete,
}: Props) {
  return (
    <div
      className="
      bg-white
      border
      border-slate-100
      rounded-[32px]
      p-6
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
    "
    >
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {habit.title}
            </h2>

            <div className="flex items-center gap-3 mt-3">
              <div
                className="
                px-4
                py-1.5
                rounded-full
                bg-violet-100
                text-violet-700
                text-sm
                font-semibold
              "
              >
                {habit.category}
              </div>

              <div className="flex items-center gap-1 text-orange-500 font-semibold">
                <Flame size={18} />

                <span>
                  {habit.streak} day streak
                </span>
              </div>
            </div>
          </div>

          <div className="w-[220px] bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className={`
                h-full
                rounded-full
                transition-all
                duration-500
                ${
                  habit.completed
                    ? "w-full bg-gradient-to-r from-violet-500 to-purple-500"
                    : "w-[35%] bg-slate-300"
                }
              `}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              onToggle(habit.id)
            }
            className={`
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              transition-all
              duration-300
              shadow-md
              ${
                habit.completed
                  ? "bg-green-500 text-white scale-105"
                  : "bg-slate-100 text-slate-500 hover:bg-green-100 hover:text-green-600"
              }
            `}
          >
            <Check size={24} />
          </button>

          <button
            onClick={() =>
              onDelete(habit.id)
            }
            className="
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              bg-red-50
              text-red-500
              hover:bg-red-100
              transition-all
              duration-300
            "
          >
            <Trash2 size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}