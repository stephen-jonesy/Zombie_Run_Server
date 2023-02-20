const mongoose = require("mongoose");
const customersSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  address: {
    type: String,
    required: [true, "Please add address"],
  },
  birthdate: {
    type: Date,
  },
  email: {
    type: String,
  },
  accounts: {
    type: Array,
  },
  tier_and_details: {
    type: Object,
  },

  //
});
module.exports = mongoose.model("users", customersSchema);
