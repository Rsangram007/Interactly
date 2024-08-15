const express = require('express');
const {
    createContact,
    getContact,
    updateContact,
    deleteContact,
} = require('../controllers/contactController');

const router = express.Router();

router.post('/createContact', createContact);
router.get('/getContact', getContact);
router.put('/updateContact', updateContact);
router.delete('/deleteContact', deleteContact);

module.exports = router;
