var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var jwt = require('express-jwt');
var cors = require('cors');
var http = require('http');
var swig = require('swig');
var swig = new swig.Swig();

var routes = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');

var app = express();
var router = express.Router();

dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', routes);
app.use('/users', users);
app.use('/secured', authenticate);

//var token = {};


app.get('/ping', function(req, res) {
  res.send("All good. You don't need to be authenticated to call this");
});

//login page, display auth0 login page, callback is defined in the html
app.get('/login/', function(req, res) {
  res.render("authpage.html");
});

//login page, display auth0 login page, callback is defined in the html
app.get('/login2/', function(req, res) {
  res.redirect('https://' + process.env.AUTH0_DOMAIN + '/authorize/?response_type=code&client_id=' + process.env.AUTH0_CLIENT_ID + '&redirect_uri=' + process.env.AUTH0_CALLBACK_URL + '&state=VALUE_THAT_SURVIVES_REDIRECTS&scope=openid');

});
app.use('/secured/test', test);


app.get('/secured/ping', function(req, res) {
  res.status(200).send("All good. You only get this message if you're authenticated");
});

//defined callback from auth0 (must be set in the dashboard to work), contain a jwt token
app.get('/callback/', function(req, res){
  //if (!req.headers.authorization) res.send(400, 'missing authorization header');
  //console.log(req.url);
  var temp = req.url.split('/')[2];
  var temp2 = temp.split('?')[1];
  var temp3 = temp2.split('&')[0];
  var code = temp3.split('=')[1];
  //console.log("test ", temp3, " ", code);
  console.log(" '",code,"'");
  request = require('./routes/requestToken');
  request(code);
  //POST 'https://matthieumarino.eu.auth0.com/oauth/token?client_id=8pWC7g19yIA08vpw3wKYz1cDjpuvbrG2&redirect_uri=http://localhost:3001/login&client_secret=zXa4SOgEwK0IRf7O0XHJE_ZXYnKcIm-4i3KNKbM6Si1TmvEJdILATey62buIUT0k&code=AUTHORIZATION_CODE&grant_type=authorization_code'
  res.status(200).send("code:"+ code);

  //var tempToken = req.params[0];
  //console.log("Received callback; now, how do i route it back : ", req.cookies);
  //TODO Can't get token from here
  //console.log("add : '", req, "'");
  //res.status(200).send("authentification complete, token : " + JSON.stringify(req.body));
});

app.get('/callback/:token', function(req,res){
  console.log("token : ", req.params['token']);
  //TODO Never called
});

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

module.exports = app;
