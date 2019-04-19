const mongoose = require("mongoose");

let Schema = mongoose.Schema;
const CheckOutOrderSchema = new Schema({
  items: [
    {
      item_name: {
        type: String
      },
      item_price: {
        type: String
      },
      item_quantity: {
        type: String
      },
      item_image_link: {
        type: String
      }
    }
  ],
  account: {
    owner_name: {
      type: String
    },
    owner_logo_link: {
      type: String
    },
    account_number: {
      type: String
    }
  },
  is_purchased: Boolean
});
const CheckOutOrder = mongoose.model("CheckOutOrder", CheckOutOrderSchema);
module.exports = CheckOutOrder;
