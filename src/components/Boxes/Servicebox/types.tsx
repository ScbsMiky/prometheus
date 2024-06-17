export type IServicebox = {
  name: string;
  type: string;
  price: number;
  duration: string;

  onClick?( ): void;
};