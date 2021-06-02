var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
