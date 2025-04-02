import { IProduct, IResponseProduct } from "../domain/entities/Product";

export interface ProductGateway {
  getAll(
    page?: number,
    limit?: number,
    search?: string
  ): Promise<IResponseProduct>;
  getById(id: string): Promise<IProduct>;
}
