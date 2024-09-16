import { hash } from 'bcrypt';

export class User {
  public createdAt?: Date;
  public modifiedAt?: Date;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  static async new(data: Partial<User>) {
    const user = new User(data);
    console.log(user);

    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
    user.createdAt = new Date();
    return user;
  }

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
