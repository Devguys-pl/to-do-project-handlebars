require('dotenv').config();
const {
  Router
} = require('express');
const userMiddleware = require('../middleware/user.middleware');
const {TodoRecord} = require("../records/todo.record");
const todoRouter = Router();

todoRouter.get('/:taskStatus', async (req, res) => {
  const taskStatus = req.url.split('/')[1];
  if (taskStatus === 'Completed' || taskStatus=== 'Active') {
    const todosList = await TodoRecord.listAllByStatus(req.session.user.id, taskStatus);
  } else {
    req.flash('somethingWrong', 'Something wrong, please try later');
    return res.redirect('/home');
  }
})

todoRouter.get('/remove/completedTasks', async (req, res) => {
  try {
    await TodoRecord.removeCompletedTasks();
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



module.exports = {
  todoRouter,
};
