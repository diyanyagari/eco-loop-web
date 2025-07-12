export interface Activity {
  id: string;
  location: {
    id: string;
    name: string;
    qr_code: string;
    address: string;
    created_at: Date;
  };
  category: {
    id: number;
    name: string;
    point: number;
  };
  weight: number;
  created_at: string;
}
