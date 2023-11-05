import { Sequelize } from 'sequelize'
require('dotenv').config({ path: '.env' })

const DB_URL = process.env.DB_URL

if (!DB_URL) throw new Error('Missing database credentials')

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  define: { freezeTableName: true },
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
})
