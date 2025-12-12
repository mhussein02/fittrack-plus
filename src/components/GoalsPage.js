"use client";

import { useState } from "react";

export default function GoalsPage({ goals, addGoal, toggleGoal }) {
  const [form, setForm] = useState({
    title: "",
    targetDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    addGoal(form);
    setForm({ title: "", targetDate: "" });
  };

  return (
    <section className="grid gap-6 md:grid-cols-[2fr,3fr]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-4 space-y-3"
      >
        <h2 className="font-semibold text-slate-900">Add Goal</h2>
        <input
          type="text"
          placeholder="Goal title (e.g. Run 5k)"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="date"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={form.targetDate}
          onChange={(e) =>
            setForm({ ...form, targetDate: e.target.value })
          }
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 text-white text-sm font-medium py-2 hover:bg-indigo-700"
        >
          Save Goal
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="font-semibold text-slate-900">Your Goals</h2>
        {goals.length === 0 && (
          <p className="text-sm text-slate-500">
            No goals created yet. Add one on the left.
          </p>
        )}
        <ul className="space-y-2">
          {goals
            .slice()
            .reverse()
            .map((g) => (
              <li
                key={g.id}
                className="bg-white rounded-xl shadow-sm p-3 flex items-start justify-between gap-2"
              >
                <div>
                  <div className="font-medium text-sm text-slate-900">
                    {g.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {g.targetDate || "No target date"}
                  </div>
                </div>
                <button
                  onClick={() => toggleGoal(g.id)}
                  className={`text-xs px-2 py-1 rounded-full border ${
                    g.completed
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  {g.completed ? "Completed" : "Mark Done"}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
