const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RunSchema = new Schema({
  user_id: {
    type: String,
    unique: true,
  },
  run_data: {
    type: Array,
  },
  achievements: {
    type: Array,
  },
  created_at: {
    type: Date,
  },
});

const RunModel = mongoose.model("runs", RunSchema);

module.exports = RunModel;