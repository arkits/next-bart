import { FeedData } from "@/interface";
import { convertStationIdToName } from "@/lib/bart";
import dayjs from "dayjs";
import { RouteTimeline } from "./RouteTimeline";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function FeedInfo({ feedData }: { feedData: FeedData }) {
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

  return (
    <>
      <a
        href="#"
        className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-5"
      >
        <p className="font-normal mb-1 text-gray-700 dark:text-gray-400">
          {feedData?.trip?.tripId} • {feedData?.trip?.scheduleRelationship} •{" "}
          {feedData?.vehicle?.label?.toLocaleUpperCase()}
        </p>

        {nextStop?.stopId ? (
          <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {convertStationIdToName(nextStop?.stopId)}{" "}
              {dayjs().to(dayjs(Number(nextStop?.arrival.time) * 1000))}
            </h5>
            <h4>
              {convertStationIdToName(firstStop.stopId)}
              {" -> "}
              {convertStationIdToName(lastStop.stopId)}
            </h4>
          </>
        ) : (
          <>
            <h4>No next stop</h4>
          </>
        )}

        <br />

        <RouteTimeline stopTimeUpdates={feedData?.stopTimeUpdate} />

        <br />

        <details>
          <summary>Feed details</summary>
          <pre className="font-normal text-gray-700 dark:text-gray-400">
            {JSON.stringify(feedData, null, 4)}
          </pre>
        </details>
      </a>
    </>
  );
}
