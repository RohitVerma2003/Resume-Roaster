import express from "express"
import cors from "cors"
import rateLimit from "express-rate-limit"

import RoastRouter from "./routes/roast.route.js";
import "./cron/deleteUploads.js"

const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 10
})

const app = express();

app.use(cors({
    origin: ["http://localhost:5173" , "http://localhost:4173"],
    credentials: true
}))

app.use(express.json());

app.use("/api" , limiter , RoastRouter);

app.listen(8000 , ()=>{
    console.log("App is listening to 8000");
})