import { Expose } from 'class-transformer';

export class ClientUserDto {
  @Expose({ name: 'user_sid', toPlainOnly: true })
  public userSid: string;

  @Expose({ name: 'user_uid', toPlainOnly: true })
  public userUid: string;

  @Expose({ name: 'user_code', toPlainOnly: true })
  public userCode: string;

  @Expose({ name: 'user_name', toPlainOnly: true })
  public userName: string;

  @Expose({ name: 'user_email', toPlainOnly: true })
  public userEmail: string;

  @Expose({ name: 'user_first_name', toPlainOnly: true })
  public userFirstName: string;

  @Expose({ name: 'user_last_name', toPlainOnly: true })
  public userLastName: string;

  @Expose({ name: 'user_status', toPlainOnly: true })
  public userStatus: boolean;

  @Expose({ name: 'created_by', toPlainOnly: true })
  public createdBy?: string;

  @Expose({ name: 'created_date', toPlainOnly: true })
  public createdDate?: string;

  @Expose({ name: 'modified_by', toPlainOnly: true })
  public modifiedBy?: string;

  @Expose({ name: 'modified_date', toPlainOnly: true })
  public modifiedDate?: string;

  @Expose({ name: 'client_sid', toPlainOnly: true })
  public clientSid: string;

  @Expose({ name: 'client_role_sid', toPlainOnly: true })
  public clientRoleSid: string;
}
