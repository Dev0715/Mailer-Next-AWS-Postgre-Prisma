import { Filter } from "./filter";

export type Segment = {
  userEmail: string;
  segmentId: string;
  title: string;
  description: string;
  filters: Filter[];
  created: string;
  lastChanged: string;
};

export type SegmentAddition = {
  title: string;
  description: string;
  filters: Filter[];
};
