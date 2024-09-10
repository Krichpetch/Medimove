const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/index', userController.userIndexGet);
router.get('/track/:id', userController.trackRideStatus);
router.get('/scanner', userController.QRScannerGet);
router.post('/confirm-delivery/:id', userController.updatePosition);

module.exports = router;