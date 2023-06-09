import { Calculation } from "./calculation";

export type FeedCommon = {
  id: string;
  author?: string;
  comment?: string;
  score: number;
};

export type FeedCalculation = {
  id: string;
  author?: string;
  comment?: string;
  score: number;
};

export type FeedQuestion = {
  id: string;
  author?: string;
  comment: string;
};

export type FeedAlarm = {
  id: string;
  author?: string;
  input: Calculation;
};

export type Feed = FeedAlarm | FeedQuestion | FeedCalculation | FeedCommon;
