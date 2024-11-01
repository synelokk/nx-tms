import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../logger';
import { ConfigService } from '@nestjs/config';
import { SequelizeAdapter } from 'casbin-sequelize-adapter';
import { Enforcer, newEnforcer } from 'casbin';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  public async use(req: Request, res: Response, next: Function): Promise<void> {
    const xRequestId = req.headers['x-request-id'] as string;

    this.logger.warn(xRequestId, ' Check authorization');
    const dataRbac = await SequelizeAdapter.newAdapter(
      {
        logging: false,
        host: this.configService.get('DB_AUTH.HOST'),
        port: this.configService.get('DB_AUTH.PORT'),
        username: this.configService.get('DB_AUTH.USER'),
        password: this.configService.get('DB_AUTH.PASSWORD'),
        database: this.configService.get('DB_AUTH.NAME'),
        dialect: 'mssql',
        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
          },
        },
      },
      true,
    );

    const rbac = await newEnforcer(
      this.configService.get('CONFIG_RBAC'),
      dataRbac,
    );

    if (!(rbac instanceof Enforcer)) {
      res.status(500).json({ 500: 'Invalid enforcer' });
      return;
    }

    const isValid = await rbac.enforce(
      'ADMIN',
      req.originalUrl,
      req.method.toLowerCase(),
    );
    if (!isValid) {
      throw new ForbiddenException();
    }

    await next();
  }
}
