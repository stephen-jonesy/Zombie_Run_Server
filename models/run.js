const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RunSchema = new Schema({
  user_id: {
    type: String,
  },
  run_data: {
    type: Object,
    default: {}
  },
  achievements: {
    type: Array,
  },
  created_at: {
    type: Date,
  },
}, { minimize: false });

const RunModel = mongoose.model("runs", RunSchema);

module.exports = RunModel;