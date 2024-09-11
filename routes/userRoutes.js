const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/index', userController.userIndexGet);
router.get('/track/:id', userController.trackRideStatus);
router.get('/scanner', userController.QRScannerGet);
router.get('/confirm-delivery/:id', userController.getConfirmDelivery);
router.post('/confirm-delivery/:id', userController.confirmDeliveryPost);



module.exports = router;