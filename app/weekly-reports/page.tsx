"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import { supabase } from "@/lib/supabase";

import {
  format,
  subDays,
} from "date-fns";

interface Habit {
  id: string;
  title: string;
  color: string;
}

interface HabitLog {
  habit_id: string;
  completed_at: string;
}

export default function WeeklyReportsPage() {
  const [habits, setHabits] =
    useState<Habit[]>([]);

  const [logs, setLogs] =
    useState<HabitLog[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: habitsData } =
      await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id);

    const { data: logsData } =
      await supabase
        .from("habit_logs")
        .select("*")
        .eq("user_id", user.id);

    setHabits(habitsData || []);
    setLogs(logsData || []);
  };

  const last30Days = Array.from(
    { length: 30 },
    (_, i) =>
      format(
        subDays(new Date(), 29 - i),
        "yyyy-MM-dd"
      )
  );

  return (
    <AppLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-6xl font-black text-slate-900">
            Weekly Reports
          </h1>

          <p className="text-slate-500 mt-3 text-xl">
            Visualize your consistency
          </p>
        </div>

        <div className="space-y-8">
          {habits.map((habit) => {
            const habitLogs =
              logs.filter(
                (log) =>
                  log.habit_id ===
                  habit.id
              );

            const completionCount =
              habitLogs.length;

            return (
              <div
                key={habit.id}
                className="
                  bg-white
                  rounded-[36px]
                  p-8
                  border
                  border-slate-100
                  shadow-sm
                "
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900">
                      {habit.title}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      {completionCount} total completions
                    </p>
                  </div>

                  <div
                    className="
                      px-6
                      py-3
                      rounded-2xl
                      text-white
                      font-bold
                    "
                    style={{
                      background:
                        habit.color,
                    }}
                  >
                    {Math.min(
                      completionCount *
                        5,
                      100
                    )}
                    %
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-3">
                  {last30Days.map(
                    (day) => {
                      const completed =
                        habitLogs.some(
                          (log) =>
                            log.completed_at ===
                            day
                        );

                      return (
                        <div
                          key={day}
                          className="
                            aspect-square
                            rounded-xl
                            transition-all
                            hover:scale-110
                          "
                          style={{
                            backgroundColor:
                              completed
                                ? habit.color
                                : "#e2e8f0",
                            opacity:
                              completed
                                ? 1
                                : 0.5,
                          }}
                          title={day}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}