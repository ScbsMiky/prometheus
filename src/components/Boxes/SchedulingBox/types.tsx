export type ISchedulingBox = {
  price: number;
  
  name: string;
  date: string;
  phone: string;
  service: string;
  duration: string;

  onClick?( ): void;
};