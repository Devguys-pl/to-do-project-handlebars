require('dotenv').config();
const {
  Router
} = require('express');
const userMiddleware = require('../middleware/user.middleware');
const homeRouter = Router();

homeRouter.get('/', async (req, res, next) => {
  const isLogged = true;
  res.render('home', {
    isLogged,
  });
})




module.exports = {
  homeRouter,
};