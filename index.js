const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.use(
  rjwt({ secret: config.JWT_SECRET }).unless({
    path: ["/auth", "/register"]
  })
);


server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });
});

const db = mongoose.connection;
db.on("error", err => console.log(err));

db.once("open", () => {
  require("./routes/checkOutOrder")(server);
  console.log(`Server started on port ${config.PORT}`);
});
