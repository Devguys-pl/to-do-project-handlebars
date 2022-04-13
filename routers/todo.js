require('dotenv').config();
const {
  Router
} = require('express');
const userMiddleware = require('../middleware/user.middleware');
const {TodoRecord} = require("../records/todo.record");
const {URLSearchParams} = require('url');
const todoRouter = Router();

todoRouter.get('/:taskStatus', async (req, res, next) => {
  const taskStatus = req.url.split('/')[1];
  if (taskStatus === 'Completed' || taskStatus=== 'Active') {
    const todosList = await TodoRecord.listAllByStatus(req.session.user.id, taskStatus);
  } else {
    req.flash('somethingWrong', 'Something wrong, please try later');
    return res.redirect('/home');
  }
})




module.exports = {
  todoRouter,
};
