import { IsNotEmpty } from "class-validator";
import { User } from "../models/user";

export class SaveUserRequest {
  //@Expose()
  @IsNotEmpty()
  readonly firstName: string;

  //@Expose()
  @IsNotEmpty()
  readonly lastName: string;

  //@Expose()
  @IsNotEmpty()
  readonly email: string;

  //@Expose()
  @IsNotEmpty()
  readonly password: string;

  async toUser(): Promise<User> {
    return User.new(this);
  }
}