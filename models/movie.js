const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  release_date: { type: Date, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for movie's URL
MovieSchema.virtual("url").get(function () {
  return `/movie/${this._id}`;
});

// Export model
module.exports = mongoose.model("Movie", MovieSchema);
