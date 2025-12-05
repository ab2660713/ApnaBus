import mongoose from "mongoose";
const busSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true,
        default: 16
    },
    availableSeats: {
        type: Number,
        required: true,
        default: 16
    },
    busType: {
        type: String,
        enum: ['ac', 'non-ac', 'sleeper'],
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required:false
      },
      bookedSeats:{
        type:[Number],
        default:[]
      },
      lockedSeats: {
        type: [Number],
        default: [],
      },
}, {
    timestamps: true
})


export default mongoose.model('Bus', busSchema)