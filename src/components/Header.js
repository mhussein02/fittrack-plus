"use client";

export default function Header({ currentPage, setCurrentPage }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "workouts", label: "Workouts" },
    { id: "meals", label: "Meals" },
    { id: "goals", label: "Goals" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-indigo-600">FitTrack+</div>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition
                ${
                  currentPage === tab.id
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
