"use client";

export default function ProfilePage({ user }) {
  return (
    <section className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Name</span>
          <span className="font-medium text-slate-900">{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Email</span>
          <span className="font-medium text-slate-900">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Daily Calorie Goal</span>
          <span className="font-medium text-slate-900">
            {user.dailyCalorieGoal} kcal
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        In a full build, this page would also include password updates, units,
        preferences, and progress photos.
      </p>
    </section>
  );
}
