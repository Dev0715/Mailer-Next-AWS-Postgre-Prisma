import { FilterType } from "./filter-type";

export type Segment = {
  ownerEmail: string;
  segmentId: string;
  title: string;
  description: string;
  filters: FilterType[];
  created: string;
  lastChanged: string;
};
