export interface IStore {
   _id: string;
   name: string;
}

export interface IProduct {
   _id: string;
   name: string;
   description: string;
   price: number;
   images: string[];
   categories: string[];
   userId: string;
   storeId: IStore;
   state: string;
   city: string;
   boosted: boolean;
   boostWeight: number;
   boostedAt: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface IPagination {
   page: number;
   limit: number;
   totalPages: number;
   hasNextPage: false;
   hasPrevPage: false;
}
export interface IResponseProduct {
   data: IProduct[];
   count: number;
   total: number;
   pagination: IPagination;
}
