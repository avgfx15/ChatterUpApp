import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../models/userSchema.js";


export default class UserControllers {
    // @ GET Login Form
    getLoginFormController = async (req, res,) => {
        try {
            res.render('login')
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    // + UserLogin
    userLoginController = async (req, res,) => {
        try {
            const { email, password } = req.body;

            const userExists = await UserModel.findOne({ email: email })
            if (!userExists) {
                res.render('login', { success: false, message: 'User Not Found' })
            } else {
                const comparePassword = await bcrypt.compare(password, userExists.password);
                if (!comparePassword) {
                    res.render('login', { success: false, message: 'Invalid Credentials' })
                } else {
                    const userLoggedIn = await UserModel.findOne({ email: email }).select('name email mobile isOnline');
                    const jwtSecret = process.env.jwt_SECRET;
                    const token = await jwt.sign({ user: userLoggedIn }, jwtSecret, { expiresIn: '1h' })
                    await userExists.tokens.push({ token });
                    await userExists.save();
                    res.redirect(200, '/dashboard')
                    // res.render('dashboard')
                }
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    // @ GET Login Form
    getRegisterationFormController = async (req, res,) => {
        try {
            res.render('register')
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    // + User Registeration
    userRegisterationController = async (req, res,) => {
        try {
            const { name, email, mobile, password } = req.body;
            const userExists = await UserModel.findOne({ email: email });
            if (userExists) {
                res.render('register', { success: false, message: "user Already Registered" })
            } else {
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = new UserModel({
                    name: name,
                    email: email,
                    mobile: mobile,
                    profilePic: req.file.filename,
                    password: hashedPassword
                })
                await newUser.save();
                res.render('login')
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // @ GET User Dashboard

    userDashboardController = async (req, res) => {
        try {

            res.render('dashboard', { user: req.user })
        } catch (error) {
            res.redirect('/', { message: error.message });
        }
    }

}