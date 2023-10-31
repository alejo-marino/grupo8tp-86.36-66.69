import { Sequelize } from 'sequelize'

const PORT = Number(process.env.PORT)
const URL = process.env.DB_URL
const USER = process.env.DB_USER
const PASS = process.env.DB_PASS
const HOST = process.env.DB_HOST

if (!PORT || !URL || !USER || !PASS || !HOST) throw new Error('Missing database credentials')

export const sequelize = new Sequelize(URL, USER, PASS, {
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
