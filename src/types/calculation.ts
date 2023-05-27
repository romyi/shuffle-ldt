export type Calculation = {
  personnel: number | null; // stat
  landSquare: number | null; // stat
  facilitySquare: number | null; // stat
  equipment: number | null; // stat
  branch: string | null | number; // legal
  isIndividual: boolean | null; // legal
  isLandRental: boolean | null; //legal
  isFacilityRental: boolean | null; //legal
  district: string | null; // /
  district_display_alias: string | null; // / display only
};
