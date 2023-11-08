import { IMessage } from '../interfaces/messages'
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/sequelize'

export const Messages = sequelize.define<IMessage>('messages', {
  ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
