import CityList from "../domain/entities/CityList";
import HttpClient from "../infra/HttpClient";
import { CityGateway } from "./CityGateway";

export default class CityHttpGateway implements CityGateway {
  constructor(readonly httpClient: HttpClient) {}
  async findAll(): Promise<any> {
    const res = await this.httpClient.get("/cities");
    const cities = new CityList(res);
    return cities.getItems();
  }
}
