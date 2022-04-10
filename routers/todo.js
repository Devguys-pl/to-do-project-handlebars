require('dotenv').config();
const {Router} = require('express');
const userMiddleware = require('../middleware/user.middleware');
const todoRouter = Router();

todoRouter.get('/', async (req, res, next) => {
  res.send('Router działa, zakladka TODO')
})




module.exports = {
    todoRouter,
};
