import { Injectable } from '@nestjs/common';
import { Repository, UserEntity } from '@tms/common';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor() {
    super(UserEntity);
  }
}
