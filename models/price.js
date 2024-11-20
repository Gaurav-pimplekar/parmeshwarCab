import mongoose from 'mongoose';

// Define the Price schema
const priceSchema = new mongoose.Schema({
    route:{
        type:String,
        required:true,
        unique:true
    },
    pricing:{
        HATCHBACK: {type:String},
          SEDAN: {type:String},
          MUV: {type:String},
          SUV: {type:String}
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Price model from the schema
const Price = mongoose.model('Price', priceSchema);

export default Price;
