const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');


router.get('/', usersController.displayadmin);



// router.get('/subject', usersController.displayadmins);

// router.post('/subject', usersController.displayadmins);

// router.get('/signup',usersController.signup)



module.exports = router;
