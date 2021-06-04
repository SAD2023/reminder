var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nodemailer = require('nodemailer');
//var twilio = require('twilio');
var text = require('textbelt');


var TelegramBot = require('node-telegram-bot-api');
var token = '1795172111:AAH1ToSIlI3fS3jKlO6sl8FybGea5oXL4DE';
var chatId = 1589641113;
const bot = new TelegramBot(token, { polling: true });

const MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(express.static(__dirname + '/public'));
//const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.post('/', function (req, res) {
  //const job = schedule.scheduleJob(date, function () {
  //console.log('The world is going to end today.');
  //});
  if (req.body.remove) {
    const uri = "mongodb+srv://sadman:manhattan1969@remindercluster.pslvo.mongodb.net/reminders?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const DB = client.db("reminders");
      const c = DB.collection("rems");
      for (var i = 0; i < req.body.nameArray.length; i++) {
        c.deleteOne({ name: req.body.nameArray[i] })
      }
    });
  }
  else if (!req.body.form) {
    const uri = "mongodb+srv://sadman:manhattan1969@remindercluster.pslvo.mongodb.net/reminders?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      //const collection = client.db("reminders").collection("rems");
      // perform actions on the collection object
      const DB = client.db("reminders");
      const c = DB.collection("rems")
      c.insertOne(req.body);

      var year = parseInt(req.body.date.slice(0, 4));
      var month = parseInt(req.body.date.slice(5, 7)) - 1;
      var day = parseInt(req.body.date.slice(8, 11));
      var d2 = new Date(year, month, day, 22, 18, 0);
      const job = schedule.scheduleJob(d2, function () {
        //console.log('The world is going to end today.');
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'testforsadman@gmail.com',
            pass: 'Testing12345'
          }
        });

        var mailOptions = {
          from: 'testforsadman@gmail.com',
          to: 'skc86@cornell.edu',
          subject: 'Reminder for ' + d2.toDateString(),
          text: 'Hi myself! You have task | ' + req.body.name + " | due today!"
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        //
        bot.sendMessage(chatId, 'Hiya! You have task | ' + req.body.name + " | due soon! Good luck ^_^");

      });
      //const date = new Date();
      //console.log(date);
      //console.log(date.getDate());
      //console.log(date.getMonth());
      //console.log(date.getFullYear());
      //console.log(req.body.date);
      async () => {
        const collection = DB.collection("rems"); // do this INSIDE async function

        await collection.insertOne(req.body); // similarly inside async
      };
      //client.close();
    });
  }
  else {
    // get stuff from db and give to code. figure this out
    var object = {
      list: []
    }
    const uri = "mongodb+srv://sadman:manhattan1969@remindercluster.pslvo.mongodb.net/reminders?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const db = client.db("reminders");
      db.collection('rems').find({}).toArray().then((docs) => {
        object.list = docs
        //console.log(JSON.stringify(object.list));
        res.end(JSON.stringify(object))
      })
    })
    //console.log("What");
  }
})
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
  res.render('error');
});

module.exports = app;
