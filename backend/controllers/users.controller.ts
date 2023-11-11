import { Request, Response } from 'express'
import { Users } from '../models/users.model'
import { Messages } from '../models/messages.model'
import { sequelize } from '../database/sequelize'
import { QueryTypes } from 'sequelize'

export const createMessage = async (req: Request, res: Response) => {
  const { user, message } = req.body
  if (!user || !message) return res.status(400).json({ ok: false, msg: 'Missing required fields.' })

  const transaction = await sequelize.transaction()

  try {
    // const [createdUser, createdMessage] = await Promise.all([
    //   Users.findOrCreate({ where: { username: user }, transaction }),
    //   Messages.create({ username: user, content: message, transaction }),
    // ])

    const [createdUser, createdMessage] = await Promise.all([
      Users.findOrCreate({ where: { username: user }, transaction }),
      sequelize.query(`INSERT INTO messages (username, content) VALUES ('${user}', '${message}');`, {
        type: QueryTypes.INSERT,
        transaction,
      }),
    ])

    if (!createdUser || !createdMessage) {
      await transaction.rollback()
      return res.status(500).json({ ok: false, msg: 'Error while creating message.' })
    }

    await transaction.commit()

    res.status(201).json({ ok: true, msg: 'Message created' })
  } catch (error) {
    await transaction.rollback()
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error while creating message.' })
  }
}

export const getMessage = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ ok: false, msg: 'Missing required fields.' })

  try {
    const data = await Messages.findByPk(id)
    if (!data) return res.status(404).json({ ok: false, msg: 'Message not found.' })

    res.status(200).json({ ok: true, msg: 'Message found', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error while getting message.' })
  }
}

export const getMessages = async (_: Request, res: Response) => {
  try {
    const data = await Messages.findAll({ order: [['id', 'DESC']] })
    if (!data) return res.status(404).json({ ok: false, msg: 'Messages not found.' })

    return res.status(200).json({ ok: true, msg: 'Messages found', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error while getting messages.' })
  }
}
