export type ICalendar = {
  date?: Date;
  picker?: "day" | "year" | "mouth";
  children?: JSX.Element[ ] | JSX.Element;

  unable?: {
    days?: number[ ];
    dates?: number[ ];
  };

  ignore?: {
    days?: number[ ];
  };

  onChange?(date: Date): void;
};