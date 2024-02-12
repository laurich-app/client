export interface PaginateResponseDTO<T> {
  data: T[];
  pagination: {
    nbItem: number;
    limit: number;
    page: number;
  };
}
