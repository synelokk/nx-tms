import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'client',
  schema: 'dbo',
  timestamps: false,
})
export class Client extends Model {
  @Column({
    field: 'id',
    type: DataType.INTEGER,
  })
  public override id!: number;

  // #regions basic columns
  @Default('')
  @Column({
    field: 'client_sid',
    type: DataType.STRING,
    primaryKey: true,
  })
  public clientSid!: string;

  @Column({
    field: 'client_uid',
    type: DataType.STRING,
  })
  public clientUid!: string;

  @Column({
    field: 'client_code',
    type: DataType.STRING,
  })
  public clientCode!: string;
  // #endregion

  // #region advanced columns
  @Column({
    field: 'client_id',
    type: DataType.STRING,
  })
  public clientId!: string;

  @Column({
    field: 'client_key',
    type: DataType.STRING,
  })
  public clientKey!: string;

  @Column({
    field: 'client_name',
    type: DataType.STRING,
  })
  public clientName!: string;
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

  // #region relations

  // #endregion
}
