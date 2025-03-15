import { Families } from "./families";

export interface Users {
  id: string;
  nik: string;
  name: string;
  phone: string;
  email: string;
  familyId: string;
  family: Families;
  // password?: string;
  latest_login?: string;
  updated_at?: string;
  created_at?: string;
}
