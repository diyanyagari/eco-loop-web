export interface Category {
  id: string;
  name: string;
  points: number;
  icon?: string;
  active: boolean;
  description?: string;
  created_at?: Date;
}
