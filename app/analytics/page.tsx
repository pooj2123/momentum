"use client";

import { useEffect, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/lib/supabase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ChartData {
  day: string;
  completions: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<
    ChartData[]
  >([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const { data: logs } =
      await supabase
        .from("habit_logs")
        .select("*");

    const grouped: Record<
      string,
      number
    > = {};

    logs?.forEach((log) => {
      const day =
        log.completed_at;

      grouped[day] =
        (grouped[day] || 0) + 1;
    });

    const formatted = Object.entries(
      grouped
    ).map(([day, completions]) => ({
      day,
      completions,
    }));

    setData(formatted);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl font-bold">
            Analytics
          </h1>

          <p className="text-slate-400 mt-2 text-lg">
            Weekly completion trends
          </p>
        </div>

        <div className="bg-slate-800 rounded-3xl p-6 h-[500px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="completions"
                stroke="#8b5cf6"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}