export type FrameScreens = "Order" | "Services" | "Timeline" | "Diary";

export type IFrame = {
  title?: string;
  screen?: FrameScreens;
  
  isCustumer?: boolean;

  icon?: JSX.Element[ ] | JSX.Element;
  children?: JSX.Element[ ] | JSX.Element;
};