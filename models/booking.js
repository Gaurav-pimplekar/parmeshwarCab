import mongoose from 'mongoose';

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Equivalent to `allowNull: false` in Sequelize
    },
    email: {
        type: String,
        required: true, // Equivalent to `allowNull: false`
    },
    phone: {
        type: String,
        required: true, // Equivalent to `allowNull: false`
    },
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
    }
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt fields automatically

// Create the Mongoose model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
