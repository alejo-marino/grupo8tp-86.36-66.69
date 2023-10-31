import { Router } from 'express'
import * as usersController from '../controllers/users.controller'

const usersRouter = Router()

usersRouter.post('/messages', usersController.createMessage)

export default usersRouter
