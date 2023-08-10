import { Router } from 'express'

import { AdminController, DeveloperController } from './controllers'
import { auth, isAdmin } from './middlewares'

const adminController = new AdminController()
const developerController = new DeveloperController()

const routes = Router()

// admin
routes.post('/admin/login', adminController.login)
routes.get('/admin/load', auth, adminController.load)

// developer
routes.get('/developer', auth, isAdmin, developerController.getAll)
routes.get('/developer/:id', auth, isAdmin, developerController.findOne)
routes.post('/developer', auth, isAdmin, developerController.create)
routes.put('/developer/:id', auth, isAdmin, developerController.edit)
routes.delete('/developer/:id', auth, isAdmin, developerController.delete)

export default routes