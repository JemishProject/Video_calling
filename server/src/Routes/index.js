const express = require('express');
const { login,Register,getAllUser, makeGroup } = require('../controller');
const router = express.Router();

router.post('/login',login)
router.post('/Register',Register)
router.get('/getAllUser',getAllUser)
router.post('/makegroup',makeGroup)
module.exports = router;