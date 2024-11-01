import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'client_role',
  schema: 'dbo',
  timestamps: false,
})
export class ClientRole extends Model {
  // #regions basic columns
  @Default('')
  @Column({
    field: 'client_role_sid',
    type: DataType.UUIDV4,
    primaryKey: true,
    defaultValue: DataType.UUIDV4, // Or sql.uuidV1
  })
  public clientRoleSid!: string;

  @Column({
    field: 'client_role_uid',
    type: DataType.STRING,
  })
  public clientRoleUid!: string;

  @Column({
    field: 'client_role_code',
    type: DataType.STRING,
  })
  public clientRoleCode!: string;
  // #endregion

  // #region advanced columns
  @Column({
    field: 'client_role_name',
    type: DataType.STRING,
  })
  public clientRoleName!: string;

  @Column({
    field: 'client_role_name',
    type: DataType.STRING,
  })
  public clientRoleAlias!: string;
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
  @Column({
    field: 'client_sid',
    type: DataType.STRING,
  })
  public clientSid!: string;
  // #endregion
}
