import config from 'config'
import { Op } from 'sequelize'
import { BeforeBulkCreate, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

import { User } from './user.entity'

@Table
export class LoginHistory extends Model<LoginHistory> {
  @Column({ type: DataType.STRING })
  public address: string;

  @Column({ type: DataType.STRING })
  public browser: string;

  @ForeignKey(() => User )
  @Column
  public userId: string;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  public user: User;

  @BeforeBulkCreate
  public static async RemoveOldest() {
    if (config.storageLimits.userLoginHistory < 0) {
      return;
    }
    const limitDate: Date = new Date();
    limitDate.setMonth(limitDate.getMonth() - config.storageLimits.userLoginHistory);
    await LoginHistory.destroy({ where: { createdAt: { [Op.lt]: limitDate } } });
  }
}
