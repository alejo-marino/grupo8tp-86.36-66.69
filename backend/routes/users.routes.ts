import { Router } from 'express'
import * as usersController from '../controllers/users.controller'

const usersRouter = Router()

usersRouter.get('/messages', usersController.getMessages)
usersRouter.get('/messages/:id', usersController.getMessage)
usersRouter.post('/messages', usersController.createMessage)

export default usersRouter
