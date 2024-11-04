import { Expose } from 'class-transformer';

export class ClientDto {
  @Expose({ name: 'id', toPlainOnly: true })
  public id: number;

  @Expose({ name: 'client_sid', toPlainOnly: true })
  public clientSid: string;

  @Expose({ name: 'client_uid', toPlainOnly: true })
  public clientUid: string;

  @Expose({ name: 'client_code', toPlainOnly: true })
  public clientCode: string;

  @Expose({ name: 'client_id', toPlainOnly: true })
  public clientId: string;

  @Expose({ name: 'client_key', toPlainOnly: true })
  public clientKey: string;

  @Expose({ name: 'client_name', toPlainOnly: true })
  public clientName: string;

  @Expose({ name: 'created_by', toPlainOnly: true })
  public createdBy: string;

  @Expose({ name: 'created_date', toPlainOnly: true })
  public createdDate: string;

  @Expose({ name: 'modified_by', toPlainOnly: true })
  public modifiedBy: string;

  @Expose({ name: 'modified_date', toPlainOnly: true })
  public modifiedDate: string;
}
