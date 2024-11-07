import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'service',
  schema: 'dbo',
  timestamps: false,
})
export class Service extends Model {
  // #regions basic columns
  @Column({
    field: 'id',
    type: DataType.INTEGER,
  })
  public override id!: number;

  @Column({
    field: 'service_sid',
    type: DataType.UUIDV4,
    primaryKey: true,
    defaultValue: DataType.UUIDV4, // Or sql.uuidV1
  })
  public serviceSid!: string;

  @Column({
    field: 'service_uid',
    type: DataType.STRING,
  })
  public serviceUid!: string;

  @Column({
    field: 'service_code',
    type: DataType.STRING,
  })
  public serviceCode!: string;
  // #endregion

  // #region advanced columns
  @Column({
    field: 'service_id',
    type: DataType.STRING,
  })
  public serviceId!: string;

  @Column({
    field: 'service_key',
    type: DataType.STRING,
  })
  public serviceKey!: string;

  @Column({
    field: 'service_name',
    type: DataType.STRING,
  })
  public serviceName!: string;

  @Column({
    field: 'service_status',
    type: DataType.BOOLEAN,
  })
  public serviceStatus!: boolean;

  @Column({
    field: 'service_description',
    type: DataType.STRING,
  })
  public serviceDescription!: string;
  // #endregion

  // #region Created and Modified
  @Column({
    field: 'created_by',
    type: DataType.STRING,
  })
  public createdBy!: string;

  @Column({
    field: 'created_date',
    type: DataType.DATE,
  })
  public createdDate!: string;

  @Column({
    field: 'modified_by',
    type: DataType.STRING,
  })
  public modifiedBy!: string;

  @Column({
    field: 'modified_date',
    type: DataType.DATE,
  })
  public modifiedDate!: string;
  // #endregion
}
