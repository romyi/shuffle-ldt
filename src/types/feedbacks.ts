import { Calculation } from "./calculation";

export type FeedCommon = {
  id: string;
  date: string;
  author?: string;
  authorEmail?: string;
  comment?: string;
  score: number;
};

export type FeedCalculation = {
  id: string;
  date: string;
  author?: string;
  authorEmail?: string;
  comment?: string;
  score: number;
};

export type FeedQuestion = {
  id: string;
  date: string;
  author?: string;
  authorEmail?: string;
  comment: string;
};

export type FeedAlarm = {
  id: string;
  date: string;
  author?: string;
  authorEmail?: string;
  input: Calculation & { branchName: string };
};

export type Feed = FeedAlarm | FeedQuestion | FeedCalculation | FeedCommon;
