export interface NonFormattedFollowType {
  data: {
    id: number;
    attributes: {
      whomFollow: {
        data: {
          id: number;
          attributes: {
            username: string;
            email: string;
          };
        };
      };
      whoFollow: {
        data: {
          id: number;
          attributes: {
            username: string;
            email: string;
          };
        };
      };
    };
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

export interface FollowType {
  data: {
    id: number;
    whomFollow: {
      id: number;
      username: string;
      email: string;
    };
    whoFollow: {
      id: number;
      username: string;
      email: string;
    };
  }[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
