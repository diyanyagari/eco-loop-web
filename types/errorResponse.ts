export interface ErrorResponse extends Error {
  details: {
    status: number;
    message: string;
  };
}
