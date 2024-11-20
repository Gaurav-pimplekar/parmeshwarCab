import express from "express";
import { attachVehicle, createTrip, findPricesByRoute, findTripByRoute } from "../controllers/trip.controller.js";
import Price from "../models/price.js";
import {obj} from "../database.js"
import Trip from "../models/trip.js";
import cron from "node-cron"

const router = express.Router();

router.post("/trip/create", createTrip);

router.get("/trip/book", findTripByRoute);

router.patch("/trip/vehicle/:tripId", attachVehicle)

router.get("/price/trip/:id", findPricesByRoute);

const deleteData = async () => {
    try {
        // Delete all documents from the Trip collection
        const result = await Trip.deleteMany({});
        console.log(`Data deleted from backend: ${result.deletedCount} documents removed`);
    } catch (error) {
        console.error("Error deleting documents from backend:", error.message);
    }
};

// Schedule the `deleteData` function to run daily at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Cron job started: Deleting data...");
    await deleteData();
    console.log("Cron job completed.");
});

router.get('/get/price', async (req, res)=>{
    try {

        const list = await Price.find({});

        res.json(list);
        
    } catch (error) {
        console.log(error);
    }
})

router.post("/addData", async (req, res)=>{
    try {
        const data = obj.routes;

        for(let j of data){
            await Price.create(j);
        }

        res.send("data added successfully");
        
    } catch (error) {
        console.log(error);
    }
})

export default router;