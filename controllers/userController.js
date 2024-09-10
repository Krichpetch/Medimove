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
const updatePosition = (req, res) => {
    const rideId = req.params.id;
    const position = req.body;

    Ride.findByIdAndUpdate(rideId, { position }, { new: true })
        .then(result => res.status(200).json({ status: 'Delivery Completed', data: result }))
        .catch(err => res.status(500).send(err.message));

    res.redirect(`/user/index`);
};

//QR Scanner
const QRScannerGet = (req, res) => {
    res.render('scanner');
};

// Confirm delivery by scanning QR code
const confirmDelivery = (req, res) => {
    const { rideId } = req.body;

    Ride.findByIdAndUpdate(rideId, { status: 'Delivered' }, { new: true })
        .then(result => res.json({ status: 'Delivery Confirmed', data: result }))
        .catch(err => res.status(500).send(err.message));
};

// app.get('/scan', (req, res) => {
//     const targetUrl = req.query.targetUrl;

//     // Validate targetUrl to ensure it is a safe URL
//     if (targetUrl) {
//         // Perform any additional server-side processing if necessary

//         // Redirect to the target URL
//         res.redirect(targetUrl);
//     } else {
//         res.status(400).send('Invalid URL');
//     }
// });

module.exports = {
    userIndexGet,
    trackRideStatus,
    updatePosition,
    QRScannerGet
};