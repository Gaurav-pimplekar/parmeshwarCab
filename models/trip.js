import mongoose from 'mongoose';

// Define the Booking schema (renamed to tripSchema for consistency)
const tripSchema = new mongoose.Schema({
    tripType: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    date: {
        type: Date, // Date type is used for date (can store full date and time if required)
        required: true
    },
    time: {
        type: String, // Time can be stored as a string, or if you need more precision, you can use Date or Number (milliseconds)
        required: true
    },
    vehicle: {
        type: String,
    },
    price:{
        type:String
    },
    returnDate: {
        type: Date, // Date type is used for date (can store full date and time if required)
        
    },
    returnTime:{
        type: String, // Time can be stored as a string, or if you need more precision, you can use Date or Number (milliseconds)
        
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create the Mongoose model from the schema
const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
