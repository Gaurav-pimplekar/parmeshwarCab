import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"
import tripRouter from "./routes/trip.route.js"
import connectDB from "./utils/db.js";
import Price from "./models/price.js";
import path from "path"
import { fileURLToPath } from "url";
import Trip from "./models/trip.js";
const port = process.env.PORT || 8002;
const app = express();

app.use(cors());
app.use(express.json());
app.use(tripRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")))




// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

connectDB();


app.listen(port, ()=>{
    console.log(`server run on port ${port}`)
})
