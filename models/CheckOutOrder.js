const errors = require('restify-errors');
var admin = require("firebase-admin");

var db = admin.database();
var ref = db.ref("customer");
module.exports = server => {
server.post(
    '/customers',
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      const { 
        items:{
          item_name,
          item_price,
          item_quality,
          item_image_link
        },
        owner:{
          owner_name,
          owner_account
        },
        isPurchased
       } = req.body;
      var usersRef = ref.child("1");
    usersRef.set({
    items: {
        item_name,
        item_price,
        item_quality,
        item_image_link
    },
    owner: {
        owner_name,
        owner_account
    },
    isPurchased
    });
      try {
        // const newCustomer = await customer.save();
        
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );
  
  server.put(
    '/customers',
    // rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      const { 
        isPurchased
       } = req.body;
var usersRef = ref.child("1");
    usersRef.set({
    isPurchased
    });
      try {
           res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );
};
