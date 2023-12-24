"use client";

import { useEffect, useState } from "react";
import { FeedInfo } from "./FeedInfo";
import { FeedData } from "@/interface";
import dayjs, { Dayjs } from "dayjs";
import { prettyPrintDate, stopsAtStation } from "@/lib/bart";
import { LoadingSpinner } from "./LoadingSpinner";
import { FilterForm } from "./FilterForm";

export function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [rawFeedData, setRawFeedData] = useState<FeedData[]>([]);
  const [feedData, setFeedData] = useState<FeedData[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Dayjs>();

  const [startStation, setStartStation] = useState("hayw");
  const [endStation, setEndStation] = useState("mont");

  async function fetchBart() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/feed", {
        next: { revalidate: 60 },
      });
      let fd = await res.json();
      console.log("raw", fd);

      setRawFeedData(fd);

      // filter
      let filteredFd = fd.filter((fdx: FeedData) => {
        const stopsAtStart = stopsAtStation(startStation, fdx.stopTimeUpdate);
        const stopsAtEnd = stopsAtStation(endStation, fdx.stopTimeUpdate);
        if (stopsAtStart && stopsAtEnd) {
          if (
            dayjs(Number(stopsAtStart?.arrival?.time) * 1000).isBefore(
              dayjs(Number(stopsAtEnd?.arrival?.time) * 1000)
            )
          ) {
            return fdx;
          }
        }
      });

      // sort
      filteredFd = filteredFd.sort((a: FeedData, b: FeedData) => {
        return (
          Number(a?.stopTimeUpdate[0]?.arrival?.time) -
          Number(b?.stopTimeUpdate[0]?.arrival?.time)
        );
      });

      console.log("setFeedData", filteredFd);
      setFeedData(filteredFd);

      setLastRefreshed(dayjs());
    } catch (error) {}

    setIsLoading(false);
  }

  useEffect(() => {
    fetchBart();
  }, [startStation, endStation]);

  if (isLoading || feedData.length == 0) {
    return (
      <>
        <br />
        <br />
        <br />

        <FilterForm
          startStation={startStation}
          setStartStation={setStartStation}
          endStation={endStation}
          setEndStation={setEndStation}
        />

        <br />
        <br />
        <br />

        <LoadingSpinner />
      </>
    );
  } else {
    return (
      <>
        <p className="text-gray-700 dark:text-gray-400">
          Last refreshed: {prettyPrintDate(lastRefreshed)} • Filtered trains{" "}
          {feedData.length}/{rawFeedData.length}
        </p>
        <br />
        <br />

        <FilterForm
          startStation={startStation}
          setStartStation={setStartStation}
          endStation={endStation}
          setEndStation={setEndStation}
        />

        <br />
        <br />
        <br />
        <div className="max-w-fit">
          {feedData.map((fd) => (
            <FeedInfo
              key={fd?.trip?.tripId}
              feedData={fd}
              startStation={startStation}
              endStation={endStation}
            />
          ))}
        </div>
      </>
    );
  }
}
