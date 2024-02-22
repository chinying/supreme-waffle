import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import { InferModelAttributes, InferModelCreationAttributes } from '../types/model'

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<
  InferModelAttributes<User>,
  InferModelCreationAttributes<User>
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  id!: number

  @AllowNull(false)
  @Column(DataType.STRING(255))
  email!: string
}