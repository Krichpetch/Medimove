const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true
    },

    routeName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Ride = mongoose.model('Rides', rideSchema);
module.exports = Ride;