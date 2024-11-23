import express from "express";
import { attachVehicle, createTrip, findPricesByRoute, findTripByRoute } from "../controllers/trip.controller.js";
import Price from "../models/price.js";
import { obj } from "../database.js"
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

router.get('/get/price', async (req, res) => {
    try {

        const list = await Price.find({});

        res.json(list);

    } catch (error) {
        console.log(error);
    }
})

router.post("/addData", async (req, res) => {
    try {
        const data = obj.routes;

        for (let j of data) {

            const route = await Price.findOne({route: j.route});

            if(!route){
                await Price.create(j);
            }

            
        }

        res.send("data added successfully");

    } catch (error) {
        console.log(error);
    }
})




// 1. Add new price entry (POST)
router.post('/addPrice', async (req, res) => {
    try {
        const { route, pricing } = req.body;

        // Check if the route already exists
        const existingRoute = await Price.findOne({ route });
        if (existingRoute) {
            return res.status(400).json({ message: 'Route already exists' });
        }

        // Create a new Price entry
        const newPrice = new Price({
            route,
            pricing,
        });

        // Save to database
        await newPrice.save();

        res.status(200).json({
            message: 'Price entry added successfully',
            success: true,
            data: newPrice,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding price entry', error });
    }
});

// 2. Update price entry (PUT)
router.put('/updatePrice/:route', async (req, res) => {
    try {
        const { route } = req.params;
        const { pricing } = req.body;

        // Find the route by name and update it
        const updatedPrice = await Price.findOneAndUpdate(
            { route },
            { pricing },
            { new: true } // Returns the updated document
        );

        if (!updatedPrice) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.status(200).json({
            message: 'Price entry updated successfully',
            data: updatedPrice,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating price entry', error });
    }
});

// 3. Delete price entry (DELETE)
router.delete('/deletePrice/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the price entry for the given route
        const deletedPrice = await Price.findByIdAndDelete(id);

        if (!deletedPrice) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.status(200).json({
            message: 'Price entry deleted successfully',
            data: deletedPrice,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting price entry', error });
    }
});

// 4. Get all price entries (GET) - Optional: You may want to have a way to get all entries
router.get('/getPrices', async (req, res) => {
    try {
        const prices = await Price.find();
        
        res.status(200).json({ data: prices });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching price entries', error });
    }
});


export default router;