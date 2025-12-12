"use client";

import { useState } from "react";

export default function WorkoutsPage({ workouts, addWorkout, deleteWorkout }) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    duration: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date) return;
    addWorkout(form);
    setForm({ name: "", date: "", duration: "", notes: "" });
  };

  return (
    <section className="grid gap-6 md:grid-cols-[2fr,3fr]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-4 space-y-3"
      >
        <h2 className="font-semibold text-slate-900">Add Workout</h2>
        <input
          type="text"
          placeholder="Workout name (e.g. Push Day)"
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
          type="text"
          placeholder="Duration (e.g. 45 min)"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <textarea
          placeholder="Notes (exercises, sets, reps...)"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 text-white text-sm font-medium py-2 hover:bg-indigo-700"
        >
          Save Workout
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="font-semibold text-slate-900">Workout History</h2>
        {workouts.length === 0 && (
          <p className="text-sm text-slate-500">
            No workouts logged yet. Add your first one!
          </p>
        )}
        <ul className="space-y-2">
          {workouts
            .slice()
            .reverse()
            .map((w) => (
              <li
                key={w.id}
                className="bg-white rounded-xl shadow-sm p-3 flex items-start justify-between gap-2"
              >
                <div>
                  <div className="font-medium text-sm text-slate-900">
                    {w.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {w.date} · {w.duration || "Duration N/A"}
                  </div>
                  {w.notes && (
                    <div className="mt-1 text-xs text-slate-600">{w.notes}</div>
                  )}
                </div>
                <button
                  onClick={() => deleteWorkout(w.id)}
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
