import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Model } from 'sequelize-typescript'

// Wrapper over sequelize's InferAttributes generic that allows for auto-inference
// of instance attributes from model class.
export type InferModelAttributes<
  M extends Model,
  // Allow caller to add further manual omissions where auto inference fails
  Options extends { omit: keyof M | never | '' } = { omit: never },
> = InferAttributes<
  M,
  {
    // Omits fields that are irrelevant for our usecase.
    // e.g we use created_at instead of createdAt
    omit: 'version' | 'createdAt' | 'updatedAt' | 'deletedAt' | Options['omit']
  }
>

// Wrapper over sequelize's InferCreationAttributes generic that allows for auto-inference
// of instance creation from model class.
export type InferModelCreationAttributes<
  M extends Model,
  // Allow caller to add further manual omissions where auto inference fails
  Options extends { omit: keyof M | never | '' } = { omit: never },
> = InferCreationAttributes<
  M,
  {
    // Omits fields that are irrelevant for our usecase.
    // e.g we use created_at instead of createdAt
    omit: 'version' | 'createdAt' | 'updatedAt' | 'deletedAt' | Options['omit']
  }
>