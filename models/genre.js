const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
});

// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
  return `/genre/${this._id}`;
});

// Export model

module.exports = mongoose.model("Genre", GenreSchema);
