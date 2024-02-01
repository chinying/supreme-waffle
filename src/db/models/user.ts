import {
  AllowNull,
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
  @AllowNull(false)
  @Column(DataType.STRING(80))
  id!: string

  @AllowNull(false)
  @Column(DataType.STRING(255))
  email!: string
}