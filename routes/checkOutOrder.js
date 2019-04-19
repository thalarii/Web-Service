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
};
