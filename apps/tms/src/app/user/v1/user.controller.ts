import { Body, Controller, Headers, Param, Post, Scope } from '@nestjs/common';
import {
  Logger,
  SuccessMessage,
  HeaderDto,
  Get,
  DataNotFoundException,
} from '@tms/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user.dto';
import { ClientUserDto } from './dto/client-user.dto';

@Controller({
  version: '1',
  scope: Scope.REQUEST,
})
export class UserController {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @Get({
    url: 'user/:sid',
    message: {
      success: {
        httpStatus: 200,
        message: 'Success get data user',
      },
    },
    documentation: {
      description: 'Get Data User',
      status: 200,
      summary: 'Get Data User',
    },
    serialize: ClientUserDto,
  })
  public async findBySid(
    @Headers('x-request-id') xRequestId: string,
    @Param('sid') sid: string,
  ): Promise<any> {
    this.logger.warn(xRequestId, `Call API User findBySid`);
    const user = await this.userService.getClientUserBySid(sid);
    this.logger.warn(xRequestId, `Request Service User findBySid`);
    if (!user) throw new DataNotFoundException();
    this.logger.warn(
      xRequestId,
      `Response Service User findBySid`,
      JSON.stringify(user),
    );
    return user;
  }

  @Post('login')
  @SuccessMessage({
    httpStatus: 200,
    message: 'Success login',
  })
  public async login(
    @Headers('x-request-id') xRequestId: string,
    @Body() request: UserLoginDto,
  ): Promise<any> {
    this.logger.log(xRequestId, 'User login');
    await this.userService.login(request);
  }
}
