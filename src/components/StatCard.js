export default function StatCard({ label, value, subtext }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="text-2xl font-semibold text-slate-900">{value}</span>
      {subtext && (
        <span className="text-xs text-slate-500">
          {subtext}
        </span>
      )}
    </div>
  );
}
