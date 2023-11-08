import { IMessage } from '../interfaces/messages'
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/sequelize'

export const Messages = sequelize.define<IMessage>('messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
