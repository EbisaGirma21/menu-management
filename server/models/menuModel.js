const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  depth: { type: Number, required: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    default: null,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
