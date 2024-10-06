import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if(status === HttpStatus.UNAUTHORIZED) {
      response.clearCookie(
        'X-Refresh-Token',
        {
          httpOnly: true,
          secure: true,
        }
      );
    }

    response
      .status(status)
      .json({
        description: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}