import { IMessage } from '../interfaces/messages'
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/sequelize'

export const Messages = sequelize.define<IMessage>('messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
