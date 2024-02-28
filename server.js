import express from "express"
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";


dotenv.config();
const app = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(express.static("public"));

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set("views", path.resolve("views"));


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', "POST", "PUT", "DELETE"]
    }
})

const port = process.env.PORT;

app.use('/', userRouter)

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    connectDB();
})