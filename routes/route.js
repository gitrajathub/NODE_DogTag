const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.post('/addData', controller.addData);
router.get('/getData/:id', controller.getData);



module.exports = router;
