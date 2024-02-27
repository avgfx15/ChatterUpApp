import express from 'express';
import multer from 'multer';
import UserControllers from '../controllers/userControllers.js';
import upload from '../middlewares/fileUploadMulter.js';

const userRouter = express.Router();

const userControllers = new UserControllers();

// @ GET Login Form
userRouter.get('/', (req, res) => {
    userControllers.getLoginFormController(req, res)
})


// + User Login 
userRouter.post('/', (req, res, next) => {
    userControllers.userLoginController(req, res, next)
})

// @ GETUser Dashboard
userRouter.get('/dashboard', (req, res) => {
    userControllers.userDashboardController(req, res)
})

// @ GET Registration Form
userRouter.get('/register', (req, res) => {
    userControllers.getRegisterationFormController(req, res)
})

// + User Registration
userRouter.post('/register', upload.single('profilePic'), (req, res, next) => {
    userControllers.userRegisterationController(req, res, next)
})

// @ GET Login Form
userRouter.get('/', (req, res) => {
    userControllers.getLoginFormController(req, res)
})


export default userRouter;