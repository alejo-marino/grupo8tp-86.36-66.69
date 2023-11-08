import * as Sequelize from 'sequelize'

export interface IMessage extends Sequelize.Model {
  ID: number
  Username: string
  Content: string
}
