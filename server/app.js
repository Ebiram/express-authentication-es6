import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import session from 'express-session'
import cors from 'cors'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config()

// init app
const app = express();

// init configs
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI }),
  ttl: 14 * 24 * 60 * 60,
  autoRemove: 'native'
}))
app.use(passport.initialize())
app.use(passport.session())
import './controllers/auth/passport.js'

// auth routes
import authRouter from './routes/auth.js'
app.use('/', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

export default app
