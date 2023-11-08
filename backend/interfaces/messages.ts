import * as Sequelize from 'sequelize'

export interface IMessage extends Sequelize.Model {
  ID: number
  username: string
  Content: string
}
