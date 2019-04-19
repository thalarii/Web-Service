const errors = require("restify-errors");
const CheckOutOrder = require("../models/CheckOutOrder");
const randomize = require("randomatic");

module.exports = server => {
  // store checkoutorder
  server.post("/checkOutOrder", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json"));
    }

    const { items, account } = req.body;
    const unique_id = randomize("Aa0", 256);
    //   if (validate(items)) {
    let invalidAttriutes = [];
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if (
        element.item_price == "" ||
        element.item_name == "" ||
        element.item_quantity == "" ||
        element.item_image_link == ""
      ) {
        invalidAttriutes.push(element);
      }
    }

    if (account.owner_name == "" || account.account_number == "") {
    }
    console.log(invalidAttriutes);

    const checkOutOrder = new CheckOutOrder({
      items,
      account,
      is_purchased: false
    });
    if (invalidAttriutes.length > 0) {
      try {
        const newCheckOutOrder = await checkOutOrder.save();
        res.send(unique_id);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  });

  // search checkoutorder
  server.get("/checkOutOrder/:id", async (req, res, next) => {
    try {
      const checkOutOrder = await CheckOutOrder.findById(req.params.id);
      res.send(checkOutOrder);
      next();
    } catch (error) {
      return next(
        new errors.ResourceNotFoundError(
          `The id ${
            req.params.id
          } either outdated or not found on server, please check your id.`
        )
      );
    }
  });
  
  // update is_purchased attribute of a given element
  server.put("/checkOutOrder/:id", async (req, res, next) => {
    // Check for JSON
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json"));
    }

    try {
      const checkOutOrder = await CheckOutOrder.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.send(200);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `The id ${
            req.params.id
          } either outdated or not found on server, please check your id.`
        )
      );
    }
  });
  
};
