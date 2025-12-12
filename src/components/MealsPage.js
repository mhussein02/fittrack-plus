"use client";

import { useState } from "react";

export default function MealsPage({
  meals,
  addMeal,
  deleteMeal,
  user,
  todayCalories,
}) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    calories: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.calories) return;
    addMeal({ ...form, calories: Number(form.calories) });
    setForm({ name: "", date: "", calories: "", notes: "" });
  };

  return (
    <section className="grid gap-6 md:grid-cols-[2fr,3fr]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-4 space-y-3"
      >
        <h2 className="font-semibold text-slate-900">Log Meal</h2>
        <input
          type="text"
          placeholder="Meal name (e.g. Breakfast)"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="date"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Calories"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
        />
        <textarea
          placeholder="Notes (macros, food items...)"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 text-white text-sm font-medium py-2 hover:bg-emerald-700"
        >
          Save Meal
        </button>
      </form>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-semibold text-slate-900">Meals</h2>
          <p className="text-xs text-slate-500">
            Today: {todayCalories} / {user.dailyCalorieGoal} kcal
          </p>
        </div>

        {meals.length === 0 && (
          <p className="text-sm text-slate-500">
            No meals logged yet. Start by adding one on the left.
          </p>
        )}

        <ul className="space-y-2">
          {meals
            .slice()
            .reverse()
            .map((m) => (
              <li
                key={m.id}
                className="bg-white rounded-xl shadow-sm p-3 flex items-start justify-between gap-2"
              >
                <div>
                  <div className="font-medium text-sm text-slate-900">
                    {m.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {m.date} · {m.calories} kcal
                  </div>
                  {m.notes && (
                    <div className="mt-1 text-xs text-slate-600">{m.notes}</div>
                  )}
                </div>
                <button
                  onClick={() => deleteMeal(m.id)}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
