import * as Sequelize from 'sequelize'

export interface IMessage extends Sequelize.Model {
  id: number
  user: string
  message: string
  createdAt: Date
  updatedAt: Date
}
