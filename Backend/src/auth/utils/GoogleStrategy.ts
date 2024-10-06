import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { UserUseCase } from "src/user/application/ports/in/user.useCase";
import { User } from "src/user/domain/models/user";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor (public configService: ConfigService, private userUseCase: UserUseCase) {
    super({
      clientID: configService.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_OAUTH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_OAUTH_REDIRECT_URL'),
      scope: ['profile', 'email']
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {

    const email = profile.emails[0].value;
    let user = await this.userUseCase.getUserByEmail(profile.emails[0].value);

    if(!user) {
      user = await User.new({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: email,
        googleOAuthFlag: true
      });
      user = await this.userUseCase.saveUser(user);
    }
    console.log("User authenticated from Google OAuth2.0...");
    console.log(user);
    return user;
  }

}