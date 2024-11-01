import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/auth/entity/user.entity';

@Injectable()
export class AuthorizationRepository {
  constructor(
    @InjectModel(User)
    private readonly user: typeof User
  ) {}

  public findOne(userSid: string): Promise<User | null> {
    return this.user.findOne({
      where: {
        userSid,
      },
    });
  }
}
