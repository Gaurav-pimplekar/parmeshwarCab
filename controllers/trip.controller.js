
import Booking from "../models/booking.js";
import Price from "../models/price.js";
import Trip from "../models/trip.js";

export const createTrip = async (req, res) => {
    try {
        // Destructure the trip details from the request body
        const { tripType, passengers, route, date, time } = req.body;
        const data = req.body;


        // Validate the input fields
        if (!tripType || !passengers || !route || !date || !time) {
            return res.status(400).json({
                message: "All fields are required: tripType, passengers, route, date, and time."
            });
        }

        // Create a new trip in the database
        const newTrip = await Trip.create({
            tripType,
            passengers,
            route,
            date,
            time,
            returnDate: data?.returnDate || date,
            returnTime: data?.returnTime || time,
        });

        // Respond with success message and the created trip
        return res.status(201).json({
            message: "Trip created successfully",
            trip: newTrip,
        });

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error creating trip:", error.message);

        // Respond with an appropriate error message
        return res.status(500).json({
            message: "An error occurred while creating the trip. Please try again.",
        });
    }
};


export const findTripByRoute = async (req, res) => {
    try {
        // Destructure the route from the request body
        const { route } = req.body;

        // Validate the input
        if (!route) {
            return res.status(400).json({
                message: "Route is required to find the trip pricing."
            });
        }

        // Find the pricing details for the specified route
        const pricing = await Price.findOne({ route });

        // Check if pricing was found
        if (!pricing) {
            return res.status(404).json({
                message: `No pricing found for the route: ${route}.`
            });
        }

        // Respond with the found pricing
        return res.status(200).json({
            message: "Pricing found successfully",
            pricing
        });

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error finding trip by route:", error.message);

        // Respond with an appropriate error message
        return res.status(500).json({
            message: "An error occurred while finding the trip pricing. Please try again."
        });
    }
};


export const findPricesByRoute = async (req, res) => {
    try {
        // Destructure the ID from request parameters
        const { id } = req.params;

        // Validate the input
        if (!id) {
            return res.status(400).json({
                message: "Trip ID is required."
            });
        }

        // Find the trip by ID
        const trip = await Trip.findById(id);

        // Check if the trip exists
        if (!trip) {
            return res.status(404).json({
                message: `No trip found with ID: ${id}.`
            });
        }

        // Find the pricing based on the trip's route
        const price = await Price.findOne({ route: trip.route });

        // Check if price is found for the route
        if (!price) {
            return res.status(404).json({
                message: `No price found for the route: ${trip.route}.`
            });
        }

        // Respond with the found price
        return res.status(200).json({
            message: "Price found successfully",
            price
        });

    } catch (error) {
        // Log the error for debugging purposes
        console.log(error);
        console.error("Error finding price by route:", error.message);

        // Respond with an appropriate error message
        return res.status(500).json({
            message: "An error occurred while finding the price. Please try again."
        });
    }
};


export const attachVehicle = async (req, res) => {
    try {
        // Destructure the trip ID from request parameters
        const { tripId } = req.params;

        // Destructure the vehicle and price from the request body
        const { vehicle, price } = req.body;

        // Validate the input
        if (!tripId) {
            return res.status(400).json({
                message: "Trip ID is required."
            });
        }
        if (!vehicle || !price) {
            return res.status(400).json({
                message: "Both vehicle and price are required."
            });
        }

        // Update the trip with the provided vehicle and price
        const trip = await Trip.findByIdAndUpdate(
            tripId,
            { vehicle, price },
            { new: true } // Return the updated document
        );

        // Check if the trip exists
        if (!trip) {
            return res.status(404).json({
                message: `No trip found with ID: ${tripId}.`
            });
        }

        // Respond with the updated trip details
        return res.status(200).json({
            message: "Vehicle attached successfully",
            trip
        });

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error attaching vehicle:", error.message);

        // Respond with an appropriate error message
        return res.status(500).json({
            message: "An error occurred while attaching the vehicle. Please try again."
        });
    }
};


export const bookTrips = async (req, res) => {
    try {
        // Destructure booking details from the request body
        const { name, email, phone } = req.body;

        // Destructure trip ID from request parameters
        const { id } = req.params;

        // Validate the input
        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "Name, email, and phone are required to book a trip."
            });
        }

        if (!id) {
            return res.status(400).json({
                message: "Trip ID is required."
            });
        }

        // Create a new booking
        const booking = await Booking.create({
            name,
            email,
            phone,
            trip: id
        });

        // Respond with the booking confirmation
        return res.status(201).json({
            message: "Trip booked successfully",
            booking
        });

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error booking trip:", error.message);

        // Respond with an appropriate error message
        return res.status(500).json({
            message: "An error occurred while booking the trip. Please try again."
        });
    }
};
