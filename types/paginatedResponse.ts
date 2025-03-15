interface PaginatedResponse<T> {
  data: T[];
  message: string;
  success: boolean;
  offset: number;
  totalItems: number;
  itemsPerPage: number;
}
