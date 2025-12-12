"use client";

import StatCard from "@/components/StatCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const CHART_COLORS = {
  caloriesLine: "#4f46e5",
  workoutsBar: "#10b981",
  protein: "#4f46e5",
  carbs: "#f97316",
  fats: "#facc15",
};

function CaloriesLineChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2">
      <div>
        <h2 className="font-semibold text-slate-900">Weekly Calories</h2>
        <p className="text-xs text-slate-500">
          Total calories consumed per day over the last week.
        </p>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="calGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.caloriesLine} stopOpacity={0.4} />
                <stop offset="100%" stopColor={CHART_COLORS.caloriesLine} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                borderColor: "#e5e7eb",
              }}
              formatter={(value) => [`${value} kcal`, "Calories"]}
            />
            <Line
              type="monotone"
              dataKey="calories"
              stroke={CHART_COLORS.caloriesLine}
              strokeWidth={2.2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              fill="url(#calGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function WorkoutsBarChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2">
      <div>
        <h2 className="font-semibold text-slate-900">Weekly Workouts</h2>
        <p className="text-xs text-slate-500">
          Number of workout sessions completed each day.
        </p>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                borderColor: "#e5e7eb",
              }}
              formatter={(value) => [`${value} sessions`, "Workouts"]}
            />
            <Bar
              dataKey="workouts"
              radius={[6, 6, 0, 0]}
              fill={CHART_COLORS.workoutsBar}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MacroDonutChart({ calories }) {
  if (!calories || calories <= 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-center items-center text-center gap-2">
        <h2 className="font-semibold text-slate-900">Today&apos;s Macros</h2>
        <p className="text-xs text-slate-500">
          Log some meals to see a macro breakdown for today.
        </p>
      </div>
    );
  }

  const proteinCalories = calories * 0.3;
  const carbCalories = calories * 0.4;
  const fatCalories = calories * 0.3;

  const data = [
    { name: "Protein", value: Math.round(proteinCalories / 4) },
    { name: "Carbs", value: Math.round(carbCalories / 4) },
    { name: "Fats", value: Math.round(fatCalories / 9) },
  ];

  const COLORS = [
    CHART_COLORS.protein,
    CHART_COLORS.carbs,
    CHART_COLORS.fats,
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2">
      <div>
        <h2 className="font-semibold text-slate-900">Today&apos;s Macros</h2>
        <p className="text-xs text-slate-500">
          Estimated grams of protein, carbs, and fats based on your calories.
        </p>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                borderColor: "#e5e7eb",
              }}
              formatter={(value, name) => [`${value} g`, name]}
            />
            <Legend
              verticalAlign="bottom"
              height={24}
              iconType="circle"
              formatter={(value) => (
                <span style={{ fontSize: 11, color: "#6b7280" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Dashboard({
  workouts,
  meals,
  goals,
  user,
  weeklyData,
  todayCalories,
  todayWorkouts,
}) {
  const completedGoals = goals.filter((g) => g.completed).length;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user.name}
          </h1>
          <p className="text-slate-600">
            Here&apos;s a snapshot of your fitness & nutrition this week.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Today’s Calories"
          value={`${todayCalories} kcal`}
          subtext={`Goal: ${user.dailyCalorieGoal} kcal`}
        />
        <StatCard
          label="Today’s Workouts"
          value={todayWorkouts}
          subtext="Sessions logged"
        />
        <StatCard
          label="Total Workouts"
          value={workouts.length}
          subtext="All-time"
        />
        <StatCard
          label="Goals Completed"
          value={completedGoals}
          subtext={`${goals.length} total goals`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CaloriesLineChart data={weeklyData} />
        </div>
        <MacroDonutChart calories={todayCalories} />
      </div>

      <div className="grid gap-4">
        <WorkoutsBarChart data={weeklyData} />
      </div>
    </section>
  );
}
