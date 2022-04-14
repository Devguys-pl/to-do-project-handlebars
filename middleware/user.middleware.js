// middleware/user.middleware.js
require('dotenv').config();

module.exports = {
    checkSession: async (req, res, next) => {
        if (!req.session.user) {
            req.flash('userNotLogged', 'You are not logged. If you want to see own task you have to log in. Now you can only create tasks that will be saved temporarily in local storage for up to 24 hours and only available from one device. Otherwise, create an account and log in. ');
            return res.render('home', {
                isLogged: false,
                message: {
                    userNotLogged: req.flash('userNotLogged'),
                }
            })
        }
        next();
    },
    checkUserIsActive: async (req,res,next) => {
        if(req.session.user.isActive === "false") {
            console.log('Account is not active, check your e-mail box')
            // return res.redirect('/user/login');
        }
        next();
    }
};
