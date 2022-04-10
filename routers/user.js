require('dotenv').config();
const {Router} = require('express');
const userMiddleware = require('../middleware/user.middleware');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const userRouter = Router();

userRouter.get('/', async (req, res, next) => {
  res.send('Router działa')
})




module.exports = {
    userRouter,
};
