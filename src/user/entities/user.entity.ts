import { hashSync } from 'bcrypt'
import config from 'config'
import { BeforeCreate, BeforeUpdate, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table
export class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: { name: 'name', msg: 'collidingName' }
  })
  public name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public fullName: string;

  @Column({ type: DataType.STRING(4096) })
  public description: string;

  @Column({ type: DataType.STRING })
  public password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: { name: 'email', msg: 'collidingEmail' }
  })
  public email: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'en' })
  public lang: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  public active: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  public emailNotification: boolean;

  @BeforeCreate
  @BeforeUpdate
  public static hashPassword(user: User): void {
    if (user.password) {
      user.password = hashSync(user.password.trim(), config.authentication.userPasswordSalt);
    }
  }
}
