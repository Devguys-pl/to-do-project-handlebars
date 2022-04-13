require('dotenv').config();
const {Router} = require('express');
const userMiddleware = require('../middleware/user.middleware');
const {UserRecord} = require("../records/user.record");
const {TodoRecord} = require("../records/todo.record");
const {URLSearchParams} = require('url');
const homeRouter = Router();

homeRouter.get('/', async (req, res, next) => {
  const todosList = await TodoRecord.listAll(req.session.user.id);
  const isLogged = req.session.user.isLogged;
  res.render('home', {
    isLogged,
    todosList,
    message: {
      emptyField: req.flash('emptyField'),
      successLogin: req.flash('successLogin'),
      somethingWrong: req.flash('somethingWrong'),
      userNotExist: req.flash('userNotExist'),
      userExist: req.flash('userExist'),
      successRegister: req.flash('successRegister'),
      userLogout: req.flash('userLogout'),
    },
  });
});





module.exports = {
  homeRouter,
};
