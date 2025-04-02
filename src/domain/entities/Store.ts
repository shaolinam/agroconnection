export interface IStore {
  _id: string;
  name: string;
  address: string;
  description: string;
  state: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
}
