import { UserGateway } from "./UserGateway";
import HttpClient from "../infra/HttpClient";
import { IProfile, IUser } from "../domain/entities/User";

export default class UserHttpGateway implements UserGateway {
   constructor(
      readonly httpClient: HttpClient,
      readonly baseUrl?: string,
   ) {}

   async create(user: IUser): Promise<any> {
      let retorno = await this.httpClient.post(`/users`, user);
      return retorno;
   }
   async update(user: IUser): Promise<any> {
      let retorno = await this.httpClient.put(`/users`, user);
      return retorno;
   }
   async delete(id: string): Promise<any> {
      let retorno = await this.httpClient.delete(`/users/${id}`);
      return retorno;
   }
   async findAll(): Promise<any> {
      let retorno = await this.httpClient.get(`/users`);
      return retorno;
   }
   async getProfile(): Promise<IProfile> {
      let retorno = await this.httpClient.get(`/users/profile`);

      return retorno;
   }
   async findByCpf(cpf: string): Promise<any> {
      let retorno = await this.httpClient.get(`/users/cpf/${cpf}`);
      return retorno;
   }
   async login(input: { cpf: string; password: string }): Promise<any> {
      const users = [
         { username: "fazendeiro_joao", password: "senha123" },
         { username: "maria_rural", password: "rural2023" },
         { username: "agro_pedro", password: "agropecuaria" },
      ];
      let retorno;
      if (this.baseUrl) {
         retorno = await this.httpClient.post(
            `${this.baseUrl}/authentication/login`,
            input,
         );
      } else
         // retorno = await this.httpClient.post(`/auth/login`, {
         //    username: input.cpf,
         //    password: input.password,
         // });
         retorno = await this.httpClient.post(`/auth/login`, {
            username: users[0].username,
            password: users[0].password,
         });
      return retorno;
   }
}
