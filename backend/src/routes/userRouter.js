const express = require("express");

const {authUser, getUserProfile, registerUser} = require('../controllers/userController') ;
const {protect} = require('../Middlewares/authMiddleware')

const router = express.Router();

// new user creaet router
router.route('/').post(registerUser)
//login router
router.route('/login').post(authUser)
//protected router
router.route('/profile').get(protect , getUserProfile)


module.exports = router;