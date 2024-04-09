export interface NonFormattedStrapiArray<T> {
  data: {
    id: number;
    attributes: Omit<T, "id">;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiArray<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
