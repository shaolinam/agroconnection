import { IResponseProduct } from "../domain/entities/Product";
import HttpClient from "../infra/HttpClient";
import { ProductGateway } from "./ProductGateway";

export default class ProductHttpGateway implements ProductGateway {
  constructor(readonly httpClient: HttpClient, readonly baseUrl?: string) {}

  async getAll(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<IResponseProduct> {
    const retorno = await this.httpClient.get(
      `/products/public/search?page=${page}&limit=${limit}${
        search ? `&search=${search}` : ""
      }`
    );
    return retorno;
  }

  async getById(id: string) {
    try {
      const response = await this.httpClient.get(`/products/${id}`);
      return response;
    } catch (error) {
      console.error("Error getting product by ID:", error);
      throw error;
    }
  }
}
