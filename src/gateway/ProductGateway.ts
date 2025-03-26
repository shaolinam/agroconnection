import { IResponseProduct } from "../domain/entities/Product";

export interface ProductGateway {
   getAll(page?: number, limit?: number): Promise<IResponseProduct | {}>;
}
