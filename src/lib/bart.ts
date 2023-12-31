import { StopTimeUpdate } from "@/interface";
import dayjs, { Dayjs } from "dayjs";

/**
 * https://github.com/quacksire/old-bart-cars-live/blob/main/config/lists.ts
 */
export let bartStationIDs = {
  "12th": "12th St. Oakland City Center",
  "16th": "16th St. Mission (SF)",
  "19th": "19th St. Oakland",
  "24th": "24th St. Mission (SF)",
  ashb: "Ashby (Berkeley)",
  balb: "Balboa Park (SF)",
  bayf: "Bay Fair (San Leandro)",
  cast: "Castro Valley",
  civc: "Civic Center (SF)",
  cols: "Coliseum",
  colm: "Colma",
  conc: "Concord",
  daly: "Daly City",
  dbrk: "Downtown Berkeley",
  dubl: "Dublin/Pleasanton",
  deln: "El Cerrito del Norte",
  plza: "El Cerrito Plaza",
  embr: "Embarcadero (SF)",
  frmt: "Fremont",
  ftvl: "Fruitvale (Oakland)",
  glen: "Glen Park (SF)",
  hayw: "Hayward",
  lafy: "Lafayette",
  lake: "Lake Merritt (Oakland)",
  mcar: "MacArthur (Oakland)",
  mlbr: "Millbrae",
  mont: "Montgomery St. (SF)",
  nbrk: "North Berkeley",
  ncon: "North Concord/Martinez",
  oakl: "Oakland Int'l Airport",
  orin: "Orinda",
  pitt: "Pittsburg/Bay Point",
  phil: "Pleasant Hill",
  powl: "Powell St. (SF)",
  rich: "Richmond",
  rock: "Rockridge (Oakland)",
  sbrn: "San Bruno",
  sfia: "San Francisco Int'l Airport",
  sanl: "San Leandro",
  shay: "South Hayward",
  ssan: "South San Francisco",
  ucty: "Union City",
  wcrk: "Walnut Creek",
  wdub: "West Dublin",
  woak: "West Oakland",
  antc: "Antioch",
  pctr: "Pittsburg Center",
  oakb: "Oakland Airport",
  warm: "Warm Springs/South Fremont",
  mlpt: "Milpitas",
  bery: "Berryessa/North San Jose",
};

export function convertStationIdToName(stationId: string) {
  const searchStr = stationId?.toLowerCase();
  if (Object.keys(bartStationIDs).includes(searchStr)) {
    // @ts-ignore
    return bartStationIDs[searchStr];
  }
}

export function prettyPrintDate(
  date: string | Dayjs | undefined | number,
  includeDate = false
) {
  return dayjs(date)
    .format(`${includeDate ? "YYYY-MM-DD " : ""}hh:mm:ss A`)
    .trim();
}

export function stopsAtStation(
  stationId: string,
  stopTimeUpdate: StopTimeUpdate[]
) {
  return stopTimeUpdate.find(
    (stu) => stu?.stopId.toLowerCase() == stationId.toLowerCase()
  );
}
