import { ConfigService } from '@services/config.service'

const configService = new ConfigService()

// Sequelize CLI only recognises module.exports
module.exports = {
  dialect: 'postgres',
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.name'),
  ...(!configService.isDevEnv ? { ssl: true } : {}),
}