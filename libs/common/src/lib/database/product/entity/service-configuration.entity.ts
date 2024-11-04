import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'service_configuration',
  schema: 'dbo',
  timestamps: false,
})
export class ServiceConfiguration extends Model {
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
    field: 'service_configuration_sid',
    type: DataType.STRING,
  })
  public serviceConfigurationSid!: string;

  @Column({
    field: 'service_configuration_uid',
    type: DataType.STRING,
  })
  public serviceConfigurationUid!: string;
  // #endregion

  // #region advanced columns
  @Column({
    field: 'service_configuration_code',
    type: DataType.STRING,
  })
  public serviceConfigurationCode!: string;

  @Column({
    field: 'configuration_key',
    type: DataType.STRING,
    validate: {
      isEmail: true,
    },
  })
  public configurationKey!: string;

  @Column({
    field: 'configuration_value',
    type: DataType.STRING,
  })
  public configurationValue!: string;

  @Column({
    field: 'service_configuration_status',
    type: DataType.BOOLEAN,
  })
  public serviceConfigurationStatus!: boolean;
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
