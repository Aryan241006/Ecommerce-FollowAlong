const express = require('express');
const { createUser, getUsers,loginUser, getUserByEmail } = require('../controllers/usercontroller');
// const { get } = require('mongoose');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.get('/getUserByEmail', getUserByEmail);

module.exports = router;
