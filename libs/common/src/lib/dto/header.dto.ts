import { Expose } from 'class-transformer';
import { IsDefined, IsString, ValidateIf } from 'class-validator';

export class HeaderDto {
  @IsDefined()
  @IsString()
  @Expose({ name: 'x-request-id', toPlainOnly: true })
  public xRequestId!: string;

  @IsDefined()
  @IsString()
  @Expose({ name: 'content-type', toPlainOnly: true })
  @ValidateIf((_, value) => value === 'application/json')
  public contentType!: string;
}
