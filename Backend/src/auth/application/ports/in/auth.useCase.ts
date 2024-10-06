import { Request, Response } from "express";
import { User } from "src/user/domain/models/user";

export abstract class AuthUseCase {
  abstract login(user: User, password: string): Promise<string[]>;
  abstract generateAccessToken(email: string): string;
  abstract generateRefreshToken(email: string): string;
  abstract validateAccessToken(req : Request, res: Response): string;
}