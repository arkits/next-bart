import { bartStationIDs } from "@/lib/bart";

export function Select({
  label,
  selectedId,
  setStation,
}: {
  label: string;
  selectedId?: string;
  setStation: any;
}) {
  const onSet = (e: any) => {
    console.log("set station", e.target.value);
    setStation(e.target.value);
  };

  return (
    <>
      <label
        htmlFor={`${label}-select`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={`${label}-select`}
        onChange={onSet}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {Object.keys(bartStationIDs).map((stationId) => {
          return (
            <option
              key={stationId}
              value={stationId}
              selected={selectedId == stationId}
            >
              {/* @ts-ignore */}
              {bartStationIDs[stationId]}
            </option>
          );
        })}
      </select>
    </>
  );
}
