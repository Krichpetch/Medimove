const Route = require('../models/route');
const Ride = require('../models/ride');
const QRCode = require('qrcode'); // Install using npm install qrcode

// Handle building selection
const selectBuildingGet = (req, res) => {
    res.render('order');
};

const selectBuildingPost = (req, res) => {
    const newRide = new Ride(req.body);

    newRide.save()
        .then(result => res.redirect(`/driver/ordering/${result._id}`))
        .catch(err => res.status(500).send(err.message));
};

//Fetch delivery time from Route
const compareRideAndRoute = async(rideId) => {
    try {
        // Fetch the Ride based on rideId
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return console.log('Ride not found');
        }

        // Fetch the Route that matches the routeName in the Ride
        const route = await Route.findOne({ routeName: ride.routeName });
        if (!route) {
            return console.log('Route not found');
        }

        // Compare the fields
        if (ride.routeName === route.routeName) {
            console.log(route.deliveryTime);
            return route.deliveryTime;
        } else {
            console.log('The route names do not match.');
        }
    } catch (err) {
        console.error('Error comparing ride and route:', err);
    }
};


//Handle ordering status

const orderingGet = async(req, res) => {
    const id = req.params.id;

    try {
        const ride = await Ride.findById(id);
        if (ride) {
            const time = await compareRideAndRoute(id); // Wait for the delivery time to be resolved
            res.render('on_the_go', { order: ride, deliver: time });
        } else {
            res.render('404', { title: 'Page not found' });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.render('404', { title: 'Error', error: err.message });
    }
};

const orderingPost = (req, res) => {
    const rideId = req.body;


    res.redirect(`/driver/generate-qr/${rideId.rideId}`)

    console.log(rideId);
};



// Handle QR code scan to update position
const checkStatus = (req, res) => {
    const rideId = req.params.id;
    Ride.findById(rideId)
        .then(ride => {
            if (ride.status === 'Delivery Completed') {
                return res.json({ scanned: true });
            } else {
                return res.json({ scanned: false });
            }
        })
        .catch(err => res.status(500).send(err.message));
};

// Generate a QR code for delivery confirmation

const getUrl = (protocol, host, id) => {

    const newUrl = `
                            $ { protocol }: //${host}${'/user/confirm-delivery/'}${id}`
    return newUrl;
};



const generateQR = (req, res) => {
    const id = req.params.id;
    const protocol = req.protocol; // e.g., 'http' or 'https'
    const host = req.get('host'); // e.g., '127.0.0.1:3000'

    // Construct the full URL manually
    const url = getUrl(protocol, host, id);

    console.log('Showing QR Code info');
    console.log(id);
    console.log(url);

    QRCode.toDataURL(url, (err, qrCodeUrl) => {
        if (err) {
            return res.status(500).send('Error generating QR code');
        }
        res.render('driver_confirm', {
            title: 'Scan to confirm order',
            order: id,
            QR: qrCodeUrl
        });
    });
};


// // Generate a QR code for delivery confirmation
// const driverConfirmGet = (req, res) => {
//     const { id } = req.params; // Get the rideId from the route parameter

//     // Check if the QR code was generated and is available
//     const qrCodeUrl = req.session.qrCodeUrl; // Retrieve the QR code URL from the session

//     if (!qrCodeUrl) {
//         return res.status(404).send('QR code not found');
//     }

//     // Render the driver_confirm.ejs with the QR code
//     res.render('driver_confirm', {
//         title: 'Scan to Confirm Delivery',
//         qrCodeUrl: qrCodeUrl, // Pass the QR code URL to the view
//         order: id
//     });
// };


module.exports = {
    selectBuildingGet,
    selectBuildingPost,
    orderingGet,
    orderingPost,
    checkStatus,
    generateQR,
    // driverConfirmGet
};