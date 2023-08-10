import { Router } from 'express'
// import ScheduleController from './controllers/ScheduleController'
// import UserController from './controllers/UserController'
// import { auth } from './middlewares/auth'

// const { index, store, registerPeople, show, destroy } = ScheduleController
// const { post, login, auth: authController, get } = UserController
const routes = Router()

// routes.post('/admin', auth, store)
routes.get('/admin', (req, res) => {
  res.send('Hellow world')
})
// routes.get('/admin/:id', show)
// routes.put('/admin/:id', registerPeople)
// routes.delete('/admin/:id', auth, destroy)


// routes.post('/user', post)
// routes.get('/user', get)
// routes.post('/login', login)
// routes.get('/auth', auth, authController)

export default routes