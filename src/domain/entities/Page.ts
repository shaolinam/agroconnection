export interface IPagination {
   page: number;
   limit: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPrevPage: boolean;
}

export interface IPage {
   count: number;
   total: number;
   pagination: IPagination;
}
