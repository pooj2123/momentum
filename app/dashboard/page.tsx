"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import HabitCard from "@/components/habits/HabitCard";

import { supabase } from "@/lib/supabase";
import { getAppDate } from "@/lib/day";

interface Habit {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  streak: number;
}

export default function DashboardPage() {
  const [habits, setHabits] =
    useState<Habit[]>([]);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } =
      await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
      console.log(
        "FETCH ERROR:",
        JSON.stringify(error, null, 2)
      );

      return;
    }

    if (data) {
      setHabits(data);
    }
  };

  const addHabit = async () => {
    if (!title || !category) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const response = await supabase
      .from("habits")
      .insert([
        {
          title,
          category,
          completed: false,
          streak: 0,
          user_id: user.id,
        },
      ]);

    if (response.error) {
      console.log(response.error);
      return;
    }

    setTitle("");
    setCategory("");

    fetchHabits();
  };

  const toggleHabit = async (
    id: string
  ) => {
    const habit = habits.find(
      (h) => h.id === id
    );

    if (!habit) return;

    const newCompleted =
      !habit.completed;

    const { error } = await supabase
      .from("habits")
      .update({
        completed: newCompleted,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    const today = getAppDate();

    if (newCompleted) {
      const { data: existingLog } =
        await supabase
          .from("habit_logs")
          .select("*")
          .eq("habit_id", id)
          .eq("completed_at", today)
          .single();

      if (!existingLog) {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        await supabase
          .from("habit_logs")
          .insert([
            {
              habit_id: id,
              completed_at: today,
              user_id: user?.id,
            },
          ]);
      }
    } else {
      await supabase
        .from("habit_logs")
        .delete()
        .eq("habit_id", id)
        .eq("completed_at", today);
    }

    fetchHabits();
  };

  const deleteHabit = async (
    id: string
  ) => {
    const { error } = await supabase
      .from("habits")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    fetchHabits();
  };

  const completedHabits =
    habits.filter((h) => h.completed)
      .length;

  const progress =
    habits.length > 0
      ? Math.round(
          (completedHabits /
            habits.length) *
            100
        )
      : 0;

  return (
    <AppLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-6xl font-black tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-3 text-xl">
            Small progress every day.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-[32px] p-8 shadow-xl">
            <p className="text-lg opacity-80">
              Today's Progress
            </p>

            <h2 className="text-7xl font-black mt-5">
              {progress}%
            </h2>

            <p className="mt-4 opacity-80">
              {completedHabits} of{" "}
              {habits.length} habits done
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <p className="text-slate-500 text-lg">
              Total Habits
            </p>

            <h2 className="text-7xl font-black mt-5 text-slate-900">
              {habits.length}
            </h2>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <p className="text-slate-500 text-lg">
              Completed Today
            </p>

            <h2 className="text-7xl font-black mt-5 text-slate-900">
              {completedHabits}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">
            Add New Habit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Habit title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="bg-slate-100 rounded-2xl p-5 outline-none text-slate-900"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="bg-slate-100 rounded-2xl p-5 outline-none text-slate-900"
            />

            <button
              onClick={addHabit}
              className="bg-violet-500 hover:bg-violet-600 transition rounded-2xl p-5 font-bold text-white shadow-lg"
            >
              Add Habit
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onDelete={deleteHabit}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}