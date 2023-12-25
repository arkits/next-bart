import { FeedData } from "@/interface";
import { convertStationIdToName } from "@/lib/bart";
import dayjs from "dayjs";
import { RouteTimeline } from "./RouteTimeline";

import relativeTime from "dayjs/plugin/relativeTime";
import { Card } from "./Card";
dayjs.extend(relativeTime);

export function FeedInfo({
  feedData,
  startStation,
  endStation,
}: {
  feedData: FeedData;
  startStation?: string;
  endStation?: string;
}) {
  const firstStop = feedData?.stopTimeUpdate[0];
  const lastStop =
    feedData?.stopTimeUpdate[feedData?.stopTimeUpdate.length - 1];

  let nextStop;

  for (const stu of feedData.stopTimeUpdate) {
    if (dayjs(Number(stu.arrival.time) * 1000).isBefore(dayjs())) {
      nextStop = stu;
    }
  }
  if (!nextStop) {
    nextStop = feedData.stopTimeUpdate[0];
  }

  const startStationHeader = () => {
    const stu = feedData?.stopTimeUpdate.find(
      (stu) =>
        stu?.stopId.toLocaleLowerCase() == startStation?.toLocaleLowerCase()
    );

    const arrivalTime = dayjs(Number(stu?.arrival.time) * 1000);

    if (arrivalTime.isAfter(dayjs())) {
      return `Arrives ${dayjs().to(arrivalTime)}`;
    } else {
      return `Departed ${dayjs().to(arrivalTime)}`;
    }
  };

  return (
    <>
      <Card>
        <p className="font-normal mb-1 text-gray-700 dark:text-gray-400">
          {feedData?.trip?.tripId} • {feedData?.trip?.scheduleRelationship} •{" "}
          {feedData?.vehicle?.label?.toLocaleUpperCase()}
        </p>

        {nextStop?.stopId ? (
          <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {startStationHeader()}
            </h5>
            <h4>
              {dayjs(Number(nextStop?.arrival.time) * 1000).isAfter(dayjs())
                ? "Arriving "
                : "Departed "}
              {convertStationIdToName(nextStop?.stopId)}{" "}
              {dayjs().to(dayjs(Number(nextStop?.arrival.time) * 1000))} {" → "}
              {convertStationIdToName(lastStop.stopId)}
            </h4>
          </>
        ) : (
          <>
            <h4>No next stop</h4>
          </>
        )}

        <br />

        <RouteTimeline
          stopTimeUpdates={feedData?.stopTimeUpdate}
          startStation={startStation}
          endStation={endStation}
        />
      </Card>
      <br />
      <br />
    </>
  );
}
