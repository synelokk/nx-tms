import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'client_user',
  schema: 'dbo',
  timestamps: false,
})
export class ClientUser extends Model {
  // #regions basic columns
  @Column({
    field: 'id',
    type: DataType.INTEGER,
  })
  public override id!: number;

  @Default('')
  @Column({
    field: 'user_sid',
    type: DataType.UUIDV4,
    primaryKey: true,
    defaultValue: DataType.UUIDV4, // Or sql.uuidV1
  })
  public userSid!: string;

  @Column({
    field: 'user_uid',
    type: DataType.STRING,
  })
  public userUid!: string;

  @Column({
    field: 'user_code',
    type: DataType.STRING,
  })
  public userCode!: string;
  // #endregion

  // #region advanced columns
  @Column({
    field: 'user_name',
    type: DataType.STRING,
  })
  public userName!: string;

  @Column({
    field: 'user_email',
    type: DataType.STRING,
    validate: {
      isEmail: true,
    },
  })
  public userEmail!: string;

  @Column({
    field: 'user_first_name',
    type: DataType.STRING,
  })
  public userFirstName!: string;

  @Column({
    field: 'user_last_name',
    type: DataType.STRING,
  })
  public userLastName!: string;

  @Column({
    field: 'user_status',
    type: DataType.BOOLEAN,
  })
  public userStatus!: boolean;
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
