import { Item } from './items';
export interface Order {
  $key ?:string;
  id: number;
  KID: string;
  item: Item;
  name:string;
  type:string;
  price:number;
  amount:number;
  status:string;
  time:string;
}
