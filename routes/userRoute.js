import express from 'express';
import multer from 'multer';
import UserControllers from '../controllers/userControllers.js';

const userRouter = express.Router();

const userControllers = new UserControllers();

// @ GET Login Form
userRouter.get('/', (req, res) => {
    userControllers.getLoginFormController(req, res)
})

// + User Login 
userRouter.post('/', (req, res) => {
    userControllers.userLoginController(req, res)
})

// @ GET Registration Form
userRouter.get('/register', (req, res) => {
    userControllers.getRegisterationFormController(req, res)
})

// + User Registration
userRouter.post('/register', (req, res) => {
    userControllers.userRegisterationController(req, res)
})

// @ GET Login Form
userRouter.get('/', (req, res) => {
    userControllers.getLoginFormController(req, res)
})


export default userRouter;