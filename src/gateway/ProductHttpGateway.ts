import { IResponseProduct } from "../domain/entities/Product";
import HttpClient from "../infra/HttpClient";
import { ProductGateway } from "./ProductGateway";

export default class ProductHttpGateway implements ProductGateway {
   constructor(
      readonly httpClient: HttpClient,
      readonly baseUrl?: string,
   ) {}

   async getAll(
      page: number = 1,
      limit: number = 10,
   ): Promise<IResponseProduct[]> {
      let retorno = await this.httpClient.get(
         `/products/public/search?page=${page}&limit=${limit}`,
      );
      return retorno;
   }
}
