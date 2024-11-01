import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AUTH } from './authorization.config';

@Module({
  imports: [
    ConfigModule.forFeature(AUTH),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH.JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('AUTH.JWT_EXPIRES_IN')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthorizationModule {}
