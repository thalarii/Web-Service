var admin = require("firebase-admin");
const restify = require('restify');
const config = require('./config');

const server = restify.createServer();
var serviceAccount = require("./addcheckoutorders-firebase-adminsdk-7yjri-c14fda13d3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://addcheckoutorders.firebaseio.com"
});

// Middleware
server.use(restify.plugins.bodyParser());

// Protect Routes
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.PORT, () => {
    require('./routes/addCheckOutOrder')(server);
    require('./firebase')(server);
    console.log(`Server started on port ${config.PORT}`);

});
