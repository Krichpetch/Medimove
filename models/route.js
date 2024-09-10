const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    routeName: {
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
    deliveryTime: {
        type: Number,
        required: true
    },
}, { timestamps: false });

const Route = mongoose.model('Routes', routeSchema);
module.exports = Route;