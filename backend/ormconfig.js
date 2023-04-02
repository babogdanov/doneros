const BASE_CONNECTION = {
  name: 'default',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  type: 'postgres',
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['src/services/typeorm/entities/**/*.ts'],
  migrations: ['src/services/typeorm/migrations/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/services/typeorm/entities',
    migrationsDir: 'src/services/typeorm/migrations',
    subscribersDir: 'src/services/typeorm/subscriber',
  },
}

const SEED_CONNECTION = {
  ...BASE_CONNECTION,
  name: 'seed',
  migrations: ['src/services/typeorm/seeds/*.ts'],
  cli: {
    ...BASE_CONNECTION.cli,
    migrationsDir: 'src/services/typeorm/seeds',
  },
}

module.exports = [BASE_CONNECTION, SEED_CONNECTION]
