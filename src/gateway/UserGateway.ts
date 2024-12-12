import { IUser } from "../domain/entities/User";

export interface UserGateway {
  create(user: IUser): Promise<any>;
  update(user: IUser): Promise<any>;
  delete(id: string): Promise<any>;
  findAll(): Promise<any>;
  findByCpf(cpf: string): Promise<any>;
  login(input: { cpf: string; password: string }): Promise<any>;
}
