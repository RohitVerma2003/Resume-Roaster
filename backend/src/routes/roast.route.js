import express from "express";
import multer from "multer";
import path from "path"
import { roast } from "../controllers/roast.controller.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const RoastRouter = express.Router();
const upload = multer({storage})

RoastRouter.post("/roast" , upload.single('pdf') , roast);

export default RoastRouter;