import express from "express";
import initWebRoutes from "./routes/web";
import configViewEngine from "./config/viewEngine";
require('dotenv').config()
import bodyParser from 'body-parser'
// import connection from "./config/connectDB";

const app = express()
const PORT = process.env.PORT || 3000
//config view engine
configViewEngine(app)

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB
// connection()

//init web route
initWebRoutes(app)

app.listen(PORT, () => {
    console.log("PORT", PORT)
})