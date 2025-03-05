export interface IUser {
   id: String;
   name: String;
   cpf: String;
   email: String;
   birthday: Date;
   password: String;
   actived: Boolean;
   created_at?: Date;
   updated_at?: Date;
}

export interface IResponseLogin {
   access_token: string;
   // user: {
   //   id: string;
   //   name: string;
   //   email: string;
   // };
   // token: string;
}

export interface IProfile {
   message: string;
   user: {
      userId: string;
      username: string;
   };
}

export default class User {
   id: String;
   constructor(
      id: String,
      readonly name: String,
      readonly cpf: String,
      readonly email: String,
      readonly birthday: Date,
      readonly password: String,
      readonly actived: Boolean,
      readonly created_at?: Date,
      readonly updated_at?: Date,
   ) {
      this.id = id;
   }
   static create(
      name: String,
      cpf: String,
      email: String,
      birthday: Date,
      password: String,
      actived: Boolean,
      created_at?: Date,
      updated_at?: Date,
   ) {
      const uuid = crypto.randomUUID();
      return new User(
         uuid,
         name,
         cpf,
         email,
         birthday,
         password,
         actived,
         created_at,
         updated_at,
      );
   }
}
