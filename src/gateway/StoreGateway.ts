import { IStore } from "../domain/entities/Store";

export interface StoreGateway {
  list(): Promise<IStore[]>;
  create(store: Omit<IStore, "_id">): Promise<IStore>;
  uploadImage(file: FormData): Promise<{ data: { link: string } }>;
}
