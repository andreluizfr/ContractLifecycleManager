import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthUseCase } from 'src/auth/application/ports/in/auth.useCase';
import { LoginDTO } from 'src/auth/domain/dtos/loginDTO';
import { GoogleAuthGuard } from 'src/auth/utils/Guards';
import { UserUseCase } from 'src/user/application/ports/in/user.useCase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authUseCase: AuthUseCase,
    private readonly userUseCase: UserUseCase) {}

  @Get('user')
  async fetchUser(@Req() req: Request, @Res() res: Response) {
    const email = this.authUseCase.validateAccessToken(req, res);
    const user = await this.userUseCase.getUserByEmail(email);
    if(user) {
      res.status(HttpStatus.OK).json({
        data: user,
        message: 'User fetching was successful.'
      });
    } else {
      res.clearCookie(
        'X-Refresh-Token',
        {
          httpOnly: true,
          secure: true,
        }
      );
      throw new BadRequestException('Something bad happened');
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() request: LoginDTO, @Res() res: Response) {

    const user = await this.userUseCase.getUserFromLogin(request);
    console.log(user);

    const [accessToken, refreshToken] = await this.authUseCase.login(user, request.password);

    this.setRefreshCookie(res, refreshToken);

    res.header['X-Access-Token'] = accessToken;

    res.status(HttpStatus.OK).json({
      data: null,
      message: 'Login was succesfull.'
    });
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async handleRedirect(@Req() req: Request, @Res() res: Response) {

    const accessToken = this.authUseCase.generateRefreshToken((req.user as any).email);
    const refreshToken = this.authUseCase.generateRefreshToken((req.user as any).email);

    this.setRefreshCookie(res, refreshToken);
    this.saveTokensRedirect(res, accessToken);
  }

  saveTokensRedirect(res: Response, accessToken: string) {
    const webAppRedirect = `${this.configService.get<string>('WEB_APP_URL')}:${this.configService.get<string>('WEB_APP_PORT')}/auth/redirect/${accessToken}`;
    res.redirect(webAppRedirect);
  }

  setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie(
      'X-Refresh-Token',
      refreshToken,
      {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
      }
    );
  }

}
