export class JwtToken {
  public email: string;
  public createdAt: Date;

  static async new(data: Partial<JwtToken>) {
    const jwtToken = new JwtToken(data);
    console.log(jwtToken);

    jwtToken.createdAt = new Date();
    return jwtToken;
  }

  constructor(data: Partial<JwtToken>) {
    Object.assign(this, data);
  }
}
