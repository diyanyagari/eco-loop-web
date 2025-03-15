import { Users } from "./users";

export interface Families {
  kk_number: string;
  family_name: string;
  users?: Users[];
}
