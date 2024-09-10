const express = require('express');
const driverController = require('../controllers/driverController');

const router = express.Router();

router.get('/select-building', driverController.selectBuildingGet);
router.post('/select-building', driverController.selectBuildingPost);
router.get('/ordering/:id', driverController.orderingGet);
router.post('/ordering/:id', driverController.orderingPost);
router.post('/scan-qr/:id', driverController.checkStatus);
router.get('/generate-qr/:id', driverController.generateQR); // For generating QR and redirecting
module.exports = router;