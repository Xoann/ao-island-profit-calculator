import { City } from "@/utils/types"; // if you defined it elsewhere

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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl">
      {cities.map((city) => (
        <div key={city} className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">{city}</label>

          <input
            type="number"
            min={0}
            className="
              w-full px-3 py-2 rounded-lg
              bg-gray-800 text-gray-100 
              border border-gray-700
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
            value={plotCounts[city]}
            onChange={(e) => onChange(city, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}
