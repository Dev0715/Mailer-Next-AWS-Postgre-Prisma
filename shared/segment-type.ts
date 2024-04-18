import { FilterType } from "./filter-type";

export type Segment = {
  userEmail: string;
  segmentId: string;
  title: string;
  description: string;
  filters: FilterType[];
  created: string;
  lastChanged: string;
};

export type SegmentAddition = {
  title: string;
  description: string;
  filters: FilterType[];
};
