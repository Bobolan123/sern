import express from "express";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configViewEngine from "./config/viewEngine";
require('dotenv').config()
import bodyParser from 'body-parser'
// import connection from "./config/connectDB";
import confCors from "./config/cors";
import cookieParser from "cookie-parser"


const app = express()
const PORT = process.env.PORT || 3001

//config cors
confCors(app)

//config view engine
configViewEngine(app)

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie parser
app.use(cookieParser())

//test connection DB
// connection()

//init web route
initWebRoutes(app)
initApiRoutes(app)

app.use((req, res) => {
    return res.send('404 not found')
})
app.listen(PORT, () => {
    console.log("PORT", PORT)
})