import { IUser } from '../interfaces/users'
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/sequelize'

export const Messages = sequelize.define<IUser>('users', {
  username: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
  },
})
