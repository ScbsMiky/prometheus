export type ISlider = {
  date: Date;
  selected?: number;
  disabled?: number[ ];

  onClick?(day: number): void;
};