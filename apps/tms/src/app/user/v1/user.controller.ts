import { Body, Controller, Post, Scope } from '@nestjs/common';
import { Logger, Header, SuccessMessage, HeaderDto } from '@tms/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user.dto';

@Controller({
  version: '1',
  scope: Scope.REQUEST,
})
export class UserController {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @SuccessMessage({
    httpStatus: 200,
    message: 'Success login',
  })
  public async login(
    @Header() header: HeaderDto,
    @Body() request: UserLoginDto,
  ): Promise<any> {
    this.logger.log(header.xRequestId, 'User login');
    await this.userService.login(request);
  }
}
