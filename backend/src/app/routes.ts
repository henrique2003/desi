import { Router } from 'express'

import { AdminController } from './controllers'
import { auth } from './middlewares/auth'

const routes = Router()

// routes.post('/admin', auth, store)
routes.post('/admin/login', AdminController.login)
routes.get('/admin', AdminController.load)
routes.get('/admin/load', auth, AdminController.load)
// routes.post('/admin', AdminController.create)
// routes.get('/admin/:id', show)
// routes.put('/admin/:id', registerPeople)


// routes.post('/user', post)
// routes.get('/user', get)
// routes.post('/login', login)
// routes.get('/auth', auth, authController)

export default routes