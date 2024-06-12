export type IBlur = {
  activated?: boolean;
  children?: JSX.Element[ ] | JSX.Element;
  
  onClose?( ): void;
};