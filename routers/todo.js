require('dotenv').config();
const {Router} = require('express');
const userMiddleware = require('../middleware/user.middleware');
// const viewRender = require('../utils/view.render');
const {TodoRecord} = require("../records/todo.record");
const todoRouter = Router();

todoRouter.get('/:taskStatus', async (req, res) => {
  const taskStatus = req.url.split('/')[1];
  if (taskStatus === 'Completed' || taskStatus=== 'Active') {
    const todosList = await TodoRecord.listAllByStatus(req.session.user.id, taskStatus);
    const isLogged = req.session.user.isLogged;
    return res.render('home', {
      isLogged,
      todosList,
      message: {
        emptyField: req.flash("emptyField"),
        successLogin: req.flash("successLogin"),
        somethingWrong: req.flash("somethingWrong"),
        userNotExist: req.flash("userNotExist"),
        userExist: req.flash("userExist"),
        userCreated: req.flash("userCreated"),
        successTaskCreated: req.flash('successTaskCreated'),
        userLogout: req.flash("userLogout"),
        successfulTaskRemoved: req.flash("successfulTaskRemoved"),
        unSuccessfulTaskRemoved: req.flash("unSuccessfulTaskRemoved"),
        successfulChangeTaskStatus: req.flash("successfulChangeTaskStatus"),
      },
    })
  } else {
    req.flash('somethingWrong', 'Something wrong, please try later');
    return res.redirect('/home');
  }
})

todoRouter.get('/remove/completedTasks', async (req, res) => {
  try {
    await TodoRecord.removeCompletedTasks(req.session.user.id);
    req.flash('successfulCompletedTasksRemoved', 'Completed tasks were removed.');
    return res.redirect('/home');
  } catch(e) {
    req.flash('somethingWrong', 'Something wrong, please try again later');
    return res.redirect('/home');
  }
})

// todoRouter.get('/remove/:id', async (req, res) => {
//   const taskId = req.url.split('/')[2];
//   try {
//     if (typeof taskId === "string") {
//       TodoRecord.remove(taskId);
//       req.flash('successfulTaskRemoved', `Task was successful removed from database.`);
//       return res.redirect('/home');
//     }
//
//   } catch(err) {
//     req.flash('unSuccessfulTaskRemoved', `Task not found, something wrong.`);
//   }
//
// })

todoRouter.get('/status/:id/', async (req, res) => {
  const taskId = req.url.split('/')[2]
  if (typeof taskId === "string") {
    try {
      const results = await TodoRecord.getOneById(taskId);
      const task = results[0];
      if (task.id === taskId) {
        if (task.status !== 'Active') {
          const status = 'Active';
          await TodoRecord.getOneByIdAndChangeStatus(taskId, status)
          req.flash('successfulChangeTaskStatus', `Status task was changed to: ${status}`);
          return res.redirect('/home');
        } else if (task.status !== 'Completed'){
          const status = 'Completed';
          await TodoRecord.getOneByIdAndChangeStatus(taskId, status)
          req.flash('successfulChangeTaskStatus', `Status task was changed to: ${status}`);
          return res.redirect('/home');
        } else {
          req.flash('somethingWrong', 'Something wrong');
          return res.redirect('/home');
        }
      }
    } catch (e) {
      req.flash('somethingWrong', 'Something wrong');
      console.log(`Error from todo.js router: ${e}`)
      return res.redirect('/home');
    }
  }
});

todoRouter.post('/create', async (req, res) => {
    if (req.body.taskTitle.length <= 0) {
        req.flash('emptyField', 'Please insert the requested information.');
        return res.redirect('/home');
    }
    const newTask = new TodoRecord(req.body)
    await newTask.create(req.session.user.id)
    req.flash('successTaskCreated', 'Task was successful created');
    return res.redirect('/home')
})



module.exports = {
  todoRouter,
};
