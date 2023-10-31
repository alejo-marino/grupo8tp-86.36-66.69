import { Request, Response } from 'express'
import { Messages } from '../models/users.model'

export const createMessage = (req: Request, res: Response) => {
  const { user, message } = req.body
  if (!user || !message) return res.status(400).json({ ok: false, msg: 'Missing required fields.' })

  const createdMessage = Messages.create({ user, message })
  if (!createdMessage) return res.status(500).json({ ok: false, msg: 'Error while creating message.' })

  return res.status(201).json({ ok: true, msg: 'Message created' })
}
