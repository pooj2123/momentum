"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import { supabase } from "@/lib/supabase";

import {
  Dumbbell,
  Laptop,
  BookOpen,
  Folder,
  Target,
  Clock3,
  Trash2,
  Plus,
} from "lucide-react";

interface Habit {
  id: string;
  title: string;
  category: string;
  color: string;
  reminder_time: string;
  streak: number;
  completed: boolean;
}

export default function HabitsPage() {
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

    const { data } =
      await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id)
        .eq("archived", false);

    if (data) {
      setHabits(data);
    }
  };

  const addHabit = async () => {
    if (!title || !category)
      return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("habits")
      .insert([
        {
          title,
          category,
          completed: false,
          streak: 0,
          color: "#8b5cf6",
          user_id: user.id,
        },
      ]);

    setTitle("");
    setCategory("");

    fetchHabits();
  };

  const deleteHabit = async (
    id: string
  ) => {
    await supabase
      .from("habits")
      .delete()
      .eq("id", id);

    fetchHabits();
  };

  const updateHabit = async (
    id: string,
    field: string,
    value: string
  ) => {
    await supabase
      .from("habits")
      .update({
        [field]: value,
      })
      .eq("id", id);

    fetchHabits();
  };

  const getIcon = (
    category: string
  ) => {
    switch (
      category.toLowerCase()
    ) {
      case "health":
      case "gym":
        return Dumbbell;

      case "study":
        return BookOpen;

      case "project":
        return Folder;

      case "learning":
        return Laptop;

      default:
        return Target;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-black text-slate-900">
              Habits
            </h1>

            <p className="text-slate-500 mt-3 text-xl">
              Manage your personal systems
            </p>
          </div>
        </div>

        <div
          className="
            bg-white
            rounded-[36px]
            border
            border-slate-100
            shadow-sm
            p-8
          "
        >
          <h2 className="text-3xl font-black text-slate-900 mb-6">
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
              className="
                bg-slate-100
                rounded-2xl
                p-5
                outline-none
              "
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                bg-slate-100
                rounded-2xl
                p-5
                outline-none
              "
            />

            <button
              onClick={addHabit}
              className="
                bg-violet-600
                hover:bg-violet-700
                text-white
                rounded-2xl
                font-bold
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Plus size={20} />

              Add Habit
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {habits.map((habit) => {
            const Icon = getIcon(
              habit.category
            );

            return (
              <div
                key={habit.id}
                className="
                  bg-white
                  rounded-[36px]
                  border
                  border-slate-100
                  shadow-sm
                  overflow-hidden
                "
              >
                <div className="flex items-center">
                  <div
                    className="w-2 self-stretch"
                    style={{
                      background:
                        habit.color ||
                        "#8b5cf6",
                    }}
                  />

                  <div className="flex-1 p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                      <div className="flex items-center gap-5">
                        <div
                          className="
                            w-20
                            h-20
                            rounded-3xl
                            flex
                            items-center
                            justify-center
                          "
                          style={{
                            backgroundColor:
                              `${habit.color}20`,
                          }}
                        >
                          <Icon
                            size={34}
                            color={
                              habit.color
                            }
                          />
                        </div>

                        <div>
                          <input
                            value={
                              habit.title
                            }
                            onChange={(
                              e
                            ) =>
                              updateHabit(
                                habit.id,
                                "title",
                                e.target
                                  .value
                              )
                            }
                            className="
                              text-3xl
                              font-black
                              text-slate-900
                              bg-transparent
                              outline-none
                            "
                          />

                          <input
                            value={
                              habit.category
                            }
                            onChange={(
                              e
                            ) =>
                              updateHabit(
                                habit.id,
                                "category",
                                e.target
                                  .value
                              )
                            }
                            className="
                              text-slate-500
                              mt-2
                              bg-transparent
                              outline-none
                              block
                            "
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-500">
                        <Clock3 size={22} />

                        <input
                          type="time"
                          value={
                            habit.reminder_time ||
                            ""
                          }
                          onChange={(
                            e
                          ) =>
                            updateHabit(
                              habit.id,
                              "reminder_time",
                              e.target
                                .value
                            )
                          }
                          className="
                            bg-slate-100
                            rounded-xl
                            p-3
                            outline-none
                          "
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          🔥

                          <span className="text-3xl font-black text-slate-900">
                            {habit.streak ||
                              0}
                          </span>
                        </div>

                        <p className="text-slate-500">
                          day streak
                        </p>
                      </div>

                      <div>
                        <select
                          value={
                            habit.color
                          }
                          onChange={(e) =>
                            updateHabit(
                              habit.id,
                              "color",
                              e.target
                                .value
                            )
                          }
                          className="
                            bg-violet-50
                            text-violet-700
                            rounded-2xl
                            p-4
                            w-full
                            outline-none
                            font-semibold
                          "
                        >
                          <option value="#8b5cf6">
                            Purple
                          </option>

                          <option value="#22c55e">
                            Green
                          </option>

                          <option value="#3b82f6">
                            Blue
                          </option>

                          <option value="#ec4899">
                            Pink
                          </option>

                          <option value="#f97316">
                            Orange
                          </option>
                        </select>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            deleteHabit(
                              habit.id
                            )
                          }
                          className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-red-50
                            hover:bg-red-100
                            text-red-500
                            flex
                            items-center
                            justify-center
                            transition
                          "
                        >
                          <Trash2
                            size={28}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}