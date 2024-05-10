const express = require('express')
const router = express.Router()
const { registerUser, loginUser, deleteUser, updateUser} = require('./../controller/UserController')
const authenticateToken = require('./../auth/AuthM')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/users/:email', authenticateToken, deleteUser)
router.put('/users/:email', authenticateToken, updateUser)

module.exports = router