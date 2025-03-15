import { Bank } from "./bank";
import { Users } from "./users";

export interface Transaction {
  id: string;
  user: Users;
  location: Bank;
  weight: number;
  created_at: string;
}
