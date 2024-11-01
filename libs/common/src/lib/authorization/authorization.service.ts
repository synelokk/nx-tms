import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorizationRepository } from './authorization.repository';

@Injectable()
export class AuthorizationService {
  constructor(private authorizationRepository: AuthorizationRepository) {}

  public async signIn(userSid: string, pass: string): Promise<any> {
    const user = await this.authorizationRepository.findOne(userSid);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { ...result } = user;
    return result;
  }
}
