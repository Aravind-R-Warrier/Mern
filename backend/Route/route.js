const express=require('express')

const router=express.Router()

const userController=require('../Controller/userController')

const projectController=require('../Controller/projectContoller')
const jwtMiddleWare = require('../Middleware/jwtMiddleWare')
const multerConfig = require('../Middleware/multerMiddelWare')

// router for reg
router.post('/register',userController.register)
//router for login
router.post('/login',userController.login)
//router for addproject
router.post('/add-project',jwtMiddleWare,multerConfig.single('projectImage'),projectController.addProjects)
// router for getHomeProjects
router.get('/home-projects',projectController.getHomeProjects)
// router for getAllProjects
router.get('/all-projects',jwtMiddleWare,projectController.getAllProjects)
// router for getUserProjects
router.get('/user-projects',jwtMiddleWare,projectController.getUserProjects)
// router for editProjects
router.put('/projects/:pid/update',jwtMiddleWare,multerConfig.single('projectImage'),projectController.editProjects)
// router for deleteProjects
router.delete('/projects/:pid/delete',jwtMiddleWare,projectController.deleteProjects)

module.exports=router