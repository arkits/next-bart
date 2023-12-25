import { Button } from "./Button";
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
    <div className="mb-10 max-w-fit">
      <Card>
        <div className="flex flex-col md:flex-row items-center content-center">
          <div className="mr-5">
            <Select
              id="startStation"
              label="FROM"
              selectedId={startStation}
              setStation={setStartStation}
            />
          </div>

          <div className="mr-5 mt-5">
            <Button
              onClick={() => {
                // update localStorage
                localStorage.setItem("startStation", endStation);
                localStorage.setItem("endStation", startStation);

                // update state
                const tempStart = startStation;
                setStartStation(endStation);
                setEndStation(tempStart);
              }}
            >
              ← Swap →
            </Button>
          </div>

          <div>
            <Select
              id="endStation"
              label="TO"
              selectedId={endStation}
              setStation={setEndStation}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
