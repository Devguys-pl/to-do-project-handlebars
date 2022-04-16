require("dotenv").config();
const { Router } = require("express");
const userMiddleware = require("../middleware/user.middleware");
const viewRender = require('../utils/view.render');
const { UserRecord } = require("../records/user.record");
const { TodoRecord } = require("../records/todo.record");
const { URLSearchParams } = require("url");
const homeRouter = Router();

homeRouter.get("/", async (req, res, next) => {
  if (!req.session.user) {
    req.flash(
      "userNotLogged",
      "You are not logged. If you want to see own task you have to log in. Now you can only create tasks that will be saved temporarily in local storage for up to 24 hours and only available from one device. Otherwise, create an account and log in. "
    );
    return res.render("home", {
      isLogged: false,
      message: {
        userNotLogged: req.flash("userNotLogged"),
      },
    });
  }
  const todosList = await TodoRecord.listAll(req.session.user.id);
  const isLogged = req.session.user.isLogged;
  res.render("home", {
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
  });
});

module.exports = {
  homeRouter,
};
