const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// GET route to display the form for creating a new user
router.get('/create', usersController.displayCreateUserForm);

// POST route to handle the creation of a new user
// router.post('/', usersController.createUser);

// GET route to display all existing users
// router.get('/', usersController.displayUsers);

router.get('/signup',usersController.signup)

router.post('/signup',usersController.createUser)

router.get('/',usersController.login)

router.post('/login',usersController.auth)

router.get('/logout',usersController.logout)

router.get('/home',usersController.home)

router.post('/insert',usersController.insert)



module.exports = router;
