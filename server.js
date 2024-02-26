import express from "express"
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db/db.js";


dotenv.config();
const app = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', './views');


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', "POST", "PUT", "DELETE"]
    }
})

const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    connectDB();
})