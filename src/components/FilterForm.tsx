import { Card } from "./Card";
import { Select } from "./Select";

export function FilterForm({
  startStation,
  setStartStation,
  endStation,
  setEndStation,
}: {
  startStation: string;
  setStartStation: any;
  endStation: string;
  setEndStation: any;
}) {
  return (
    <Card>
      <div className="flex items-center content-center">
        <div className="mr-5">
          <Select
            label="FROM"
            selectedId={endStation}
            setStation={setEndStation}
          />
        </div>

        <div className="mr-5">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              const tempStart = startStation;
              setStartStation(endStation);
              setEndStation(tempStart);
            }}
          >
            ← Swap →
          </button>
        </div>

        <div>
          <Select
            label="TO"
            selectedId={startStation}
            setStation={setStartStation}
          />
        </div>
      </div>
    </Card>
  );
}
