import { ICity } from "./ICity";

export default class CityList {
  items: ICity[];
  constructor(items?: ICity[]) {
    this.items = [];
    if (items) this.items = items;
  }
  getItems() {
    return this.items;
  }
}
