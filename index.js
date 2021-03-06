require('dotenv').config();
const express = require('express');
const {urlencoded} = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash');
const {handlebarsHelpers} = require("./utils/handlebars-helpers");
const {pool} = require('./utils/db');
// ******* UTILS *******
const {handleError} = require("./utils/errors");
// ******* ROUTERS *******
const {userRouter} = require('./routers/user');
const {todoRouter} = require('./routers/todo');
const {homeRouter} = require('./routers/home');
const handlebars = require('express-handlebars');
// ******* MIDDLEWARES *******
// ******* EXPRESS CFG *******
const app = express();
// ******* APP.USE *******
app.use(express.urlencoded({
    extended: true,
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// ******* EXPRESS-MYSQL-SESSION START *******


const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({
    expiration: 24 * 60 * 60 * 1000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessiontbl',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
        }
    }
}, pool);

app.use(session({
    key: 'process.env.EXPRESS_MYSQL_SESSION_KEY',
    secret: 'process.env.EXPRESS_MYSQL_SESSION_SECRET',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));


// ******* EXPRESS-MYSQL-SESSION END *******
app.use(flash());

app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/todo', todoRouter);

// ******* EXPRESS HANDLEBARS *******

const hbs = handlebars.create({
    extname: '.hbs',
    helpers: handlebarsHelpers,
    partialsDir: '/views/partials/',
});

app.set('view engine', '.hbs');
app.engine('hbs', hbs.engine);


app.get('/', (req, res) => {
    res.redirect('/home');
});

app.listen(3000, 'localhost', () => {
    console.log('App started http://localhost:3000')
});
