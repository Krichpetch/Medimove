const Route = require('../models/route');
const Ride = require('../models/ride');

//userIndex
const userIndexGet = (req, res) => {
    res.render('index');
};

// Track the status of a ride
const trackRideStatus = (req, res) => {
    const { rideId } = req.params;

    Ride.findById(rideId)
        .then(result => res.render('trackRide', { title: 'Track Ride', ride: result }))
        .catch(err => res.status(404).render('404', { title: 'Ride not found' }));
};

// Handle QR code scan to update position
const confirmDeliveryPost = (req, res) => {
    const rideId = req.params.id;
    const status = req.body.status; // Get the status from the form

    // Update the ride's status in the database
    Ride.findByIdAndUpdate(rideId, { status }, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).json({ status: 'Ride not found' });
            }
            // Redirect to the index page after the update
            res.redirect('/user/index');
        })
        .catch(err => res.status(500).send(err.message));
};

const getConfirmDelivery = async(req, res) => {
    const id = req.params.id;
    try {
        const ride = await Ride.findById(id);
        if (ride) {
            res.render('user_confirm', { order: ride });
        } else {
            res.render('404', { title: 'Page not found' });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.render('404', { title: 'Error', error: err.message });
    }
};

//QR Scanner
const QRScannerGet = (req, res) => {
    res.render('scanner');
};

module.exports = {
    userIndexGet,
    trackRideStatus,
    confirmDeliveryPost,
    getConfirmDelivery,
    QRScannerGet
};