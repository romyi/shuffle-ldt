export type Calculation = {
  personnel: number | null; // stat
  squareLand: number | null; // stat
  squareFacilities: number | null; // stat
  equipmentUnits: number | null; // stat
  branch: string | null; // legal
  isEnterpreneur: boolean | null; // legal
  isLandRental: boolean | null; //legal
  isFacilitiesRental: boolean | null; //legal
  district: string | null; // /
  district_display_alias: string | null; // / display only
};
