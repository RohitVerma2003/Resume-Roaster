import express from "express"
import cors from "cors"

import RoastRouter from "./routes/roast.route.js";
import "./cron/deleteUploads.js"

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173/"],
    credentials: true
}))

app.use("/api" , RoastRouter);

app.listen(8000 , ()=>{
    console.log("App is listening to 8000");
})