import * as Sequelize from 'sequelize'

export interface IUser extends Sequelize.Model {
  username: string
}
