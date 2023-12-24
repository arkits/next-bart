export interface FeedData {
  trip: Trip;
  stopTimeUpdate: StopTimeUpdate[];
  vehicle: Vehicle;
}

export interface StopTimeUpdate {
  arrival: Arrival;
  departure: Arrival;
  stopId: string;
}

export interface Arrival {
  delay: number;
  time: string;
  uncertainty: number;
}

export interface Trip {
  tripId: string;
  scheduleRelationship: ScheduleRelationship;
}

export enum ScheduleRelationship {
  Scheduled = "SCHEDULED",
}

export interface Vehicle {
  label: Label;
}

export enum Label {
  The2Door = "2-door",
  The3Door = "3-door",
}
