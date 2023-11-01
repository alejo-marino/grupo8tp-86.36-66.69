import { Sequelize } from 'sequelize'
require('dotenv').config({ path: '.env' })

const PORT = Number(process.env.DB_PORT)
const DB = process.env.DB_DB
const USER = process.env.DB_USER
const PASS = process.env.DB_PASS
const HOST = process.env.DB_HOST

if (!PORT || !DB || !USER || !PASS || !HOST) throw new Error('Missing database credentials')

export const sequelize = new Sequelize(DB, USER, PASS, {
  dialect: 'postgres',
  host: HOST,
  port: PORT,
  define: { freezeTableName: true },
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
})
