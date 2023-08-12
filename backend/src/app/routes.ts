import { Router } from 'express'

import { AdminController, DeveloperController, ProprietieController, RealtorController } from './controllers'
import { auth, isAdmin, isRealtor, uploadFile } from './middlewares'

const adminController = new AdminController()
const developerController = new DeveloperController()
const proprietieController = new ProprietieController()
const realtorController = new RealtorController()

const uploadFields = [
  { name: 'creci', maxCount: 1 },
  { name: 'rg', maxCount: 1 },
  { name: 'imageProfile', maxCount: 1 }
]

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

// proprietie
routes.get('/proprietie', auth, isAdmin, proprietieController.getAll)
routes.get('/proprietie/:id', auth, isAdmin, proprietieController.findOne)
routes.post('/proprietie', auth, isAdmin, proprietieController.create)
routes.put('/proprietie/:id', auth, isAdmin, proprietieController.edit)
routes.delete('/proprietie/:id', auth, isAdmin, proprietieController.delete)

// realtor
routes.get('/realtor', auth, isAdmin, realtorController.getAll)
routes.delete('/realtor/:id', auth, isAdmin, realtorController.delete)

routes.post('/realtor', uploadFile.fields(uploadFields), realtorController.create)
routes.post('/realtor/edit', auth, isRealtor, uploadFile.fields(uploadFields), realtorController.edit)
routes.get('/realtor/load', auth, isRealtor, realtorController.load)


export default routes