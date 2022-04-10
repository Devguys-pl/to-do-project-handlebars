require('dotenv').config();
const {Router} = require('express');
const userMiddleware = require('../middleware/user.middleware');
const homeRouter = Router();

homeRouter.get('/', async (req, res, next) => {
  res.send('Router działa, zakladka "HOME" jako główna będzie');
})




module.exports = {
    homeRouter,
};
