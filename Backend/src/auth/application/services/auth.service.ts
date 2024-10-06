import { BadRequestException, Injectable, MethodNotAllowedException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthUseCase } from "src/auth/application/ports/in/auth.useCase";
import { JwtToken } from "src/auth/domain/models/jwtToken";
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";
import { User } from "src/user/domain/models/user";
import { Request, Response } from "express";
import { compare } from 'bcrypt';

@Injectable()
export class AuthService implements AuthUseCase {
  constructor(private configService: ConfigService){}

  generateAccessToken(email: string): string {
    const accessToken = sign(
      {
        email: email,
        createdAt: new Date()
      } satisfies JwtToken,
      this.configService.get<string>('JWT_SECRET'),
      {
        expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXP')
      }
    );

    return accessToken;
  }

  generateRefreshToken(email: string): string {
    const refreshToken = sign(
      {
        email: email,
        createdAt: new Date()
      } satisfies JwtToken,
      this.configService.get<string>('JWT_SECRET'),
      {
        expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXP')
      }
    );

    return refreshToken;
  }

  async login(user: User, password: string): Promise<string[]> {

    if(!user) throw new NotFoundException('User not found');

    const isMatch = await compare(password, user.password);

    if(isMatch){
      return [this.generateAccessToken(user.email), this.generateRefreshToken(user.email)];
    }

    throw new BadRequestException('Login or Password are wrong');
  }

  validateAccessToken(req : Request, res: Response): string {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
      res.clearCookie(
        'X-Refresh-Token',
        {
          httpOnly: true,
          secure: true,
        }
      );
      throw new UnauthorizedException('No token provided.');
    }

    const [ , accessToken] = authHeader.split(" ");

    try {
      const jwtPayload = verify(accessToken, this.configService.get<string>('JWT_SECRET')) as JwtToken;
      return jwtPayload.email;
    } catch (err) {
      const error = err as Error;
      res.clearCookie(
        'X-Refresh-Token',
        {
          httpOnly: true,
          secure: true,
        }
      );
      if(error.name === 'TokenExpiredError')
        throw new UnauthorizedException('You need to refresh your accessToken.');
      else
        throw new UnauthorizedException('Invalid access token, you need logging again.');
    }
  }

/*
  authentication (req : Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.send({
            refresh: false,
            success: false,
            message: 'No token provided.'
        });

    const [ , accessToken] = authHeader.split(" ");

    try {
        const jwtPayload = jwt.verify(accessToken, process.env.SECRET || 'ssshhhhhhh') as IjwtPayload;

        req.body.email = jwtPayload.email;
        next();

    } catch (err) {
      const error = err as Error;

      if(error.name === 'TokenExpiredError') {

          return res.send({
              refresh: true,
              success: false,
              message: 'You need to refresh your accessToken.'
          });

      } else {

          return res.send({
              refresh: false,
              success: false,
              login: true,
              message: 'Invalid access token, you need logging again.'
          });

      }
    }
  }

  verifyRefreshToken(refreshToken: string){
    try {
        const jwtPayload = jwt.verify(refreshToken, process.env.SECRET || 'ssshhhhhhh') as IjwtPayload;
        return jwtPayload.email;

    } catch (err) {
        const error = err as Error;

        if(error.name === 'TokenExpiredError') {
            throw new Error("Expired Refresh Token, please log in.");
        }
        throw new Error("Invalid Refresh Token, please log in.");

    }
  }

  isAdmin(req : Request, res: Response, next: NextFunction){

    const usersRepository = new UsersRepository();
    const isAdminService = new IsAdminService(usersRepository);

    try{
        const { email } = req.body;

        const isAdmin = await isAdminService.execute(email);

        if(isAdmin)
            next();
        else
            return res.status(202).send({
                refresh: false,
                success: false,
                message: 'Usuário não é administrador.',
            });
    } catch (err) {
      const error = err as Error;

      return res.status(202).send({
          refresh: false,
          success: false,
          message: error.message || 'Unexpected error.',
      });
    }
  }
*/
}