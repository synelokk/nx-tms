import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  schema: 'dbo',
  timestamps: false,
})
export class User extends Model {
  @Column({
    field: 'user_sid',
    type: DataType.UUIDV4,
    primaryKey: true,
    defaultValue: DataType.UUIDV4, // Or sql.uuidV1
  })
  public userSid!: string;

  @Column({
    field: 'user_password',
    type: DataType.STRING,
  })
  public password!: string;

  @Column({
    field: 'role_sid',
    type: DataType.STRING,
  })
  public roleSid!: string;
}
