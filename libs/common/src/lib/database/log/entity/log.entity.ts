import { randomChar, DateNowUtc } from '@tms/utils';
import { CreationOptional } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'log',
  schema: 'dbo',
  updatedAt: false,
  createdAt: false,
})
export class Log extends Model {
  @Column({
    field: 'id',
    type: DataType.INTEGER,
  })
  public override id!: number;

  //#region basic columns
  @Column({
    field: 'log_sid',
    type: DataType.UUIDV4,
    primaryKey: true,
    defaultValue: DataType.UUIDV4, // Or sql.uuidV1
  })
  public logSid!: string;

  @Column({
    field: 'log_uid',
    type: DataType.STRING,
    defaultValue: () => `LOG-${randomChar(16)}`,
  })
  public logUid!: string;

  @Column({
    field: 'log_code',
    type: DataType.STRING,
    defaultValue: () => `LOG-CODE-${randomChar(16)}`,
  })
  public logCode!: string;
  //#endregion

  // #region advanced columns
  @Column({
    field: 'log_type',
    type: DataType.STRING,
  })
  public logType!: 'INFO' | 'ERROR' | 'WARNING' | 'DEBUG' | 'VERBOSE';

  @Column({
    field: 'client_sid',
    type: DataType.STRING,
    allowNull: true,
  })
  public clientSid!: string;

  @Column({
    field: 'service_sid',
    type: DataType.STRING,
    allowNull: true,
  })
  public serviceSid!: string;

  @Column({
    field: 'class_name',
    type: DataType.STRING,
    allowNull: true,
  })
  public className!: string;

  @Column({
    field: 'function_name',
    type: DataType.STRING,
    allowNull: true,
  })
  public functionName!: string;

  @Column({
    field: 'activity_name',
    type: DataType.STRING,
  })
  public activityName!: string;

  @Column({
    field: 'message',
    type: DataType.STRING,
  })
  public message!: string;

  @Column({
    field: 'detail',
    type: DataType.STRING,
    allowNull: true,
  })
  public detail!: string;

  @Column({
    field: 'log_date',
    type: DataType.STRING,
  })
  public logDate!: string;
  // #endregion

  // #region Created

  @Column({
    field: 'created_by',
    type: DataType.STRING,
  })
  public createdBy!: string;
  // #endregion
}
