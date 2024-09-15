import bcrypt from 'bcrypt';

export class User {
  public createdAt?: Date;
  public modifiedAt?: Date;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  static async new(data: User) {
    const user = new User(data);
    const hash = await bcrypt.hash(data.password, 10);
    user.password = hash;
    return user;
  }

  constructor(data: User) {
    Object.assign(this, data);
    this.createdAt = new Date();
  }
}
