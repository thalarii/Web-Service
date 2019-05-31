
var admin = require("firebase-admin");

var serviceAccount = require("./addcheckoutorders-firebase-adminsdk-7yjri-c14fda13d3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://addcheckoutorders.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

// Get a database reference to our blog
var db = admin.database();
    
    var ref = db.ref("customer/users/customer");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
