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
      <div className="flex">
        <div className="mr-5">
          <Select
            label="TO"
            selectedId={startStation}
            setStation={setStartStation}
          />
        </div>

        <div>
          <Select
            label="FROM"
            selectedId={endStation}
            setStation={setEndStation}
          />
        </div>
      </div>
    </Card>
  );
}
