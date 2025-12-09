import { City } from "@/utils/types";

type Props = {
  plotCounts: Record<City, number>;
  onChange: (city: City, value: number) => void;
};

export default function PlotCountInputs({ plotCounts, onChange }: Props) {
  const cities: City[] = [
    "Lymhurst",
    "Bridgewatch",
    "Martlock",
    "Fort Sterling",
    "Thetford",
    "Caerleon",
    "Brecilien",
  ];

  return (
    <div
      className="
        w-full
        rounded-xl border border-amber-900/70 
        bg-slate-950/80
        shadow-[0_0_22px_rgba(0,0,0,0.75)]
        p-4 sm:p-5 relative overflow-hidden
      "
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-700 via-amber-400 to-orange-700" />

      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-amber-300 tracking-wide mb-3 pl-0.5">
        Plot Configuration
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cities.map((city) => (
          <div key={city} className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-wide text-amber-200/80">
              {city}
            </label>
            ``
            <input
              type="number"
              min={0}
              max={16}
              value={plotCounts[city]}
              onChange={(e) =>
                onChange(
                  city,
                  Math.max(0, Math.min(16, Number(e.target.value)))
                )
              }
              className="
                px-2 py-1.5 rounded-md
                bg-slate-900 text-slate-100
                border border-amber-900/40 
                shadow-inner
                focus:outline-none 
                focus:border-amber-400 
                focus:ring-1 focus:ring-amber-400
                transition text-sm
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
