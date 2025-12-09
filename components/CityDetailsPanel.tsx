import { City, Crop, CityResult } from "@/utils/types";
import { getCropName, getSilver } from "@/utils/ids";

type Props = {
  activeCity: City | null;
  rows: CityResult[];
};

export default function CityDetailsPanel({ activeCity, rows }: Props) {
  return (
    <div
      className="
        rounded-xl border border-amber-900/60 bg-slate-950/90
        shadow-[0_0_22px_rgba(0,0,0,0.75)] px-4 py-4 sm:px-6 sm:py-5
      "
    >
      {activeCity == null ? (
        <p className="text-sm text-slate-400">
          Click a city panel above to see all crops and their profits.
        </p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate-400">
          No detailed crop data available for{" "}
          <span className="text-amber-300">{activeCity}</span>.
        </p>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-semibold text-amber-300">
              {activeCity} – All Crops
            </h3>
            <p className="text-xs text-slate-400">
              Sorted by profit (highest first)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-slate-400">
                <tr>
                  <th className="px-3 py-1 text-left">Crop</th>
                  <th className="px-3 py-1 text-right">Est. Sell Price</th>
                  <th className="px-3 py-1 text-right">Est. Crop Count</th>
                  <th className="px-3 py-1 text-right">Est. Seed Loss</th>
                  <th className="px-3 py-1 text-right">Seed Cost</th>
                  <th className="px-3 py-1 text-right">Profit</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.crop}
                    className="align-middle border-b border-amber-900/30"
                  >
                    {/* Crop name */}
                    <td className="px-3 py-1.5">
                      <span className="text-slate-100">
                        {getCropName(row.crop)}
                      </span>
                    </td>

                    {/* Est. Sell Price */}
                    <td className="px-3 py-1.5 text-right">
                      <span className="font-medium text-slate-100">
                        {getSilver(row.estSellPrice)}
                      </span>{" "}
                      <span className="text-[11px] text-amber-200/80">
                        silver / crop
                      </span>
                    </td>

                    {/* Est. Crop Count */}
                    <td className="px-3 py-1.5 text-right">
                      <span className="font-medium text-slate-100">
                        {row.estCropCount.toLocaleString()}
                      </span>
                    </td>

                    {/* Est. Seed Loss */}
                    <td className="px-3 py-1.5 text-right">
                      <span className="font-medium text-slate-100">
                        {row.estSeedLoss.toLocaleString()}
                      </span>{" "}
                      <span className="text-[11px] text-amber-200/80">
                        seeds
                      </span>
                    </td>

                    {/* Seed Cost */}
                    <td className="px-3 py-1.5 text-right">
                      <span className="font-medium text-slate-100">
                        {getSilver(row.seedCost)}
                      </span>{" "}
                      <span className="text-[11px] text-amber-200/80">
                        silver
                      </span>
                    </td>

                    {/* Profit */}
                    <td className="px-3 py-1.5 text-right">
                      <span
                        className={
                          row.profit >= 0
                            ? "font-medium text-emerald-300"
                            : "font-medium text-red-400"
                        }
                      >
                        {getSilver(row.profit)}
                      </span>{" "}
                      <span className="text-[11px] text-amber-200/80">
                        silver
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
