import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const userLoggedIn = async (req, res, next) => {

    try {
        const token = req.cookies.jwtToken;
        if (token) {
            next();
        } else {
            res.writeHead(302, {
                'Location': '/login'
            });
            res.end();
        }
    } catch (error) {
        console.log(error.message);

    }
}

export const userLoggedOut = async (req, res, next) => {

    try {
        const token = req.cookies.jwtToken;
        if (token) {
            // return res.redirect(200, '/dashboard')
            res.writeHead(302, {
                'Location': '/dashboard'
            });
            return res.end();
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

