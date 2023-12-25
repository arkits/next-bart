"use client";

import { useEffect, useState } from "react";
import { FeedInfo } from "./FeedInfo";
import { FeedData } from "@/interface";
import dayjs, { Dayjs } from "dayjs";
import { prettyPrintDate, stopsAtStation } from "@/lib/bart";
import { LoadingSpinner } from "./LoadingSpinner";
import { FilterForm } from "./FilterForm";
import { getFromLs } from "@/lib/ls";
import { Button } from "./Button";
import { useInterval } from "usehooks-ts";

export function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [rawFeedData, setRawFeedData] = useState<FeedData[]>([]);
  const [feedData, setFeedData] = useState<FeedData[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Dayjs>();

  const [showUnFiltered, setShowUnFiltered] = useState(false);

  const [startStation, setStartStation] = useState(
    getFromLs("startStation") || "hayw"
  );
  const [endStation, setEndStation] = useState(
    getFromLs("endStation") || "mont"
  );

  async function fetchFeedData() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/feed");
      const fd = await res.json();
      console.log("resJson", fd);

      setRawFeedData(fd);

      if (showUnFiltered) {
        setFeedData(fd);
      } else {
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
            Number(
              a?.stopTimeUpdate.find(
                (stu) =>
                  stu?.stopId.toLocaleLowerCase() ==
                  startStation.toLocaleLowerCase()
              )?.arrival?.time
            ) -
            Number(
              b?.stopTimeUpdate.find(
                (stu) =>
                  stu?.stopId.toLocaleLowerCase() ==
                  startStation.toLocaleLowerCase()
              )?.arrival?.time
            )
          );
        });

        console.log("setFeedData", filteredFd);
        setFeedData(filteredFd);
      }

      setLastRefreshed(dayjs());
    } catch (error) {}

    setIsLoading(false);
  }

  /**
   * Refresh when stations are changed
   */
  useEffect(() => {
    fetchFeedData();
  }, [startStation, endStation, showUnFiltered]);

  /**
   * Periodically refresh feed data
   */
  useInterval(() => {
    fetchFeedData();
  }, 5000);

  return (
    <>
      <div className="flex mb-10 items-center content-center align-middle">
        {isLoading ? <LoadingSpinner /> : <></>}

        <p className="text-white drop-shadow-lg px-5 h-6 text-center">
          Last refreshed: {prettyPrintDate(lastRefreshed)} • Filtered trains{" "}
          {feedData.length}/{rawFeedData.length}
        </p>
      </div>

      <FilterForm
        startStation={startStation}
        setStartStation={setStartStation}
        endStation={endStation}
        setEndStation={setEndStation}
      />

      {feedData.length == 0 ? (
        <div className="flex flex-col items-center content-center my-10">
          <p className="mb-5 text-lg">
            None between {startStation.toLocaleUpperCase()} to{" "}
            {endStation.toLocaleUpperCase()}
          </p>

          <Button
            onClick={() => {
              setShowUnFiltered(true);
            }}
          >
            Show unfiltered
          </Button>
        </div>
      ) : (
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
      )}
    </>
  );
}
