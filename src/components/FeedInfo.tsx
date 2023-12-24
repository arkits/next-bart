import { FeedData } from "@/interface";
import {
  bartStationIDs,
  convertStationIdToName,
  prettyPrintDate,
} from "@/lib/bart";
import dayjs from "dayjs";
import { RouteTimeline } from "./RouteTimeline";

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
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {convertStationIdToName(firstStop.stopId)}
          {" -> "}
          {convertStationIdToName(lastStop.stopId)}
        </h5>
        {nextStop?.stopId ? (
          <>
            <h4>
              Next Stop: {convertStationIdToName(nextStop?.stopId)} <br />
              Arrival at{" "}
              {prettyPrintDate(Number(nextStop?.arrival.time) * 1000)}
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
