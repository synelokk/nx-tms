import { Body, Controller, Headers, Param, Post, Scope } from '@nestjs/common';
import { Logger, DataNotFoundException, Message, Get } from '@tms/common';
import { HttpStatus } from '@tms/constant';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@Controller({
  path: 'client',
  version: '1',
  scope: Scope.REQUEST,
})
export class ClientController {
  constructor(
    private readonly logger: Logger,
    private readonly clientService: ClientService,
  ) {}

  @Get({
    documentation: {
      status: HttpStatus.OK,
      summary: 'Get all clients',
      description: 'Get all clients',
    },
    message: {
      success: {
        httpStatus: HttpStatus.OK,
        message: 'Success get all clients',
      },
    },
    serialize: ClientDto,
  })
  public async findAll(
    @Headers('x-request-id') xRequestId: string,
  ): Promise<any> {
    const data1 = await this.clientService.findAll(ClientDto);
    this.logger.debug(xRequestId, `Call service findAll`);
    return data1;
  }

  @Post()
  @Message({
    success: {
      httpStatus: 201,
      message: 'Success create client',
    },
    failed: {
      message: 'Failed create client',
    },
  })
  public async create(
    @Headers('x-request-id') xRequestId: string,
    @Body() clientDto: ClientDto,
  ): Promise<any> {
    console.log('clientDto', clientDto);
    const data1 = await this.clientService.create(clientDto, {
      dto: ClientDto,
    });
    this.logger.debug(xRequestId, `Call service create`);
    return data1;
  }

  @Get({
    url: 'test-sp',
    documentation: {
      status: HttpStatus.OK,
      summary: 'Test stored procedure',
      description: 'Test stored procedure',
    },
    message: {
      success: {
        httpStatus: HttpStatus.OK,
        message: 'Success test stored procedure',
      },
    },
    serialize: ClientDto,
  })
  public async testSP(
    @Headers('x-request-id') xRequestId: string,
  ): Promise<any> {
    const data1 = await this.clientService.storedProcedure('sp_Test', {
      id: 1,
    });
    this.logger.debug(xRequestId, `Call service storedProcedure`);
    return data1;
  }

  @Get({
    url: ':sid',
    documentation: {
      status: HttpStatus.OK,
      summary: 'Find client by id',
      description: 'Find client by id',
    },
    message: {
      success: {
        httpStatus: HttpStatus.OK,
        message: 'Success find client by id',
      },
    },
  })
  public async findBySid(
    @Headers('x-request-id') xRequestId: string,
    @Param('sid') sid: string,
  ): Promise<any> {
    this.logger.debug(xRequestId, `Call API Client findBySid`);
    const data2 = await this.clientService.findByPk(sid);
    this.logger.debug(xRequestId, `Request Service Client findBySid`);
    if (!data2) throw new DataNotFoundException();
    this.logger.debug(xRequestId, `Response Service Client findBySid`);

    return data2;
  }
}
