import { Request, Response } from 'express'
import { Messages } from '../models/users.model'

export const createMessage = async (req: Request, res: Response) => {
  const { user, message } = req.body
  if (!user || !message) return res.status(400).json({ ok: false, msg: 'Missing required fields.' })

  try {
    const createdMessage = await Messages.create({ user, message })
    if (!createdMessage) return res.status(500).json({ ok: false, msg: 'Error while creating message.' })
    
    res.status(201).json({ ok: true, msg: 'Message created' })
  } catch (error) {
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

export const getMessages = async (req: Request, res: Response) => {
  try {

    const data = await Messages.findAll()
    if (!data) return res.status(404).json({ ok: false, msg: 'Messages not found.' })
    
    return res.status(200).json({ ok: true, msg: 'Messages found', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error while getting messages.' })
  }
}