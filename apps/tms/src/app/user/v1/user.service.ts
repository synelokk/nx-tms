import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { ClientUserRepository } from '../client-user.repository';
import {
  Service,
  UserNotFoundException,
  ClientUserEntity,
  UserEntity,
} from '@tms/common';
import { UserLoginDto } from './dto/user.dto';
import { WhereOptions } from 'sequelize';

@Injectable()
export class UserService extends Service<UserEntity> {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly clientUserRepository: ClientUserRepository
  ) {
    super(userRepository);
  }

  public async login(payload: UserLoginDto): Promise<UserEntity> {
    try {
      const client = await this.checkUser(payload);
      await this.checkPassword(payload, client);
      return client;
    } catch (error) {
      return error;
    }
  }

  private async checkUser(payload: UserLoginDto): Promise<UserEntity> {
    let where: WhereOptions = {
      userEmail: payload.email,
    };

    if (payload.username) {
      where = {
        userName: payload.username,
      };
    }

    const client = (await this.clientUserRepository.findByWhere(
      where
    )) as ClientUserEntity;

    if (!client) {
      throw new UserNotFoundException();
    }
    const user = await this.userRepository.findByPk(client.userSid);
    return user;
  }

  private async checkPassword(
    payload: UserLoginDto,
    user: UserEntity
  ): Promise<void> {
    if (user.password !== payload.password) {
      throw new BadRequestException('Password is incorrect');
    }
  }
}
