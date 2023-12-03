import express from "express";
import initWebRoutes from "./routes/web";
import configViewEngine from "./configs/viewEngine";
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000
//config view engine
configViewEngine(app)

//init web route
initWebRoutes(app)

app.listen(PORT, () => {
    console.log("PORT", PORT)
})