require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const {TodoRecord} = require("../records/todo.record");
const {URLSearchParams} = require('url');
const userMiddleware = require('../middleware/user.middleware');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const userRouter = Router();

userRouter.get('/', async (req, res, next) => {
  res.send('Router działa')
})


userRouter.post('/create', async (req, res) => {
   if (req.body.email.length <= 0 || req.body.password.length <= 0 || req.body.name.length <= 0 || req.body.surname.length <= 0) {
     req.flash('emptyField', 'Please insert the requested information.');
     return res.redirect('/user/register');
   } 
    const results = await UserRecord.getOneByEmail(req.body.email);
    const user = results[0];
    try{
        if (typeof user === "undefined") {
            const newUser = new UserRecord(req.body);
            const hash = await bcrypt.hash(req.body.password, 10);
            await newUser.create(hash);
            req.flash('userCreated', 'User was created');
            return res.redirect('/home');
        } else {
            req.flash('userExist', 'User exist, change your e-mail.');
            return res.redirect('/home');
        }

    } catch (e){
        req.flash('somethingWrong', 'Something wrong, please try again later');
        return res.redirect('/home');
    }

});

userRouter.post('/login',  async (req, res,) => {
    if (req.body.email.length <= 0 || req.body.password.length <= 0) {
        req.flash('emptyField', 'Please insert the requested information.');
        return res.redirect('/home');
    }
    const results = await UserRecord.getOneByEmail(req.body.email);
    const user = results[0];
    try {
        const check = await bcrypt.compare(req.body.password, results[0].password);
        if (check) {
            req.session.user = {
                id: user.id,
                isLogged: true,
            }
            req.flash('successLogin', 'Success Login, welcome!');
            res.redirect('/home');
        } else {
            req.flash('wrongInformation', 'Wrong password or e-mail');
            console.log('Wrong password or e-mail');
            return res.redirect('/home');
        }
    } catch(e){
        req.flash('userNotExist', 'The user does not exist');
        return res.redirect('/home');
    }
});



module.exports = {
    userRouter,
};
