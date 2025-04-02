import { StoreGateway } from "./StoreGateway";
import HttpClient from "../infra/HttpClient";
import { IStore } from "../domain/entities/Store";

export default class StoreHttpGateway implements StoreGateway {
  constructor(readonly httpClient: HttpClient, readonly baseUrl?: string) {}
  async list(): Promise<IStore[]> {
    const response = await this.httpClient.get("/stores");
    console.log("response: ", response);
    return response || [];
  }

  async create(store: Omit<IStore, "_id">): Promise<IStore> {
    const response = await this.httpClient.post("/stores", store);
    return response.data;
  }

  async uploadImage(formData: FormData): Promise<{ data: { link: string } }> {
    const response = await this.httpClient.post("/stores/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  }
}
