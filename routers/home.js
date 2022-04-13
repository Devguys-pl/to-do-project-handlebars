require('dotenv').config();
const {Router} = require('express');
const userMiddleware = require('../middleware/user.middleware');
const {UserRecord} = require("../records/user.record");
const {TodoRecord} = require("../records/todo.record");
const {URLSearchParams} = require('url');
const homeRouter = Router();

homeRouter.get('/', async (req, res, next) => {
  
  const todosList = await TodoRecord.listAll(req.session.user.id);
  const isLogged = true;
  console.log(todosList)
  res.render('home', {
    isLogged,
    todosList,
  });
});

homeRouter.get('')




module.exports = {
  homeRouter,
};
