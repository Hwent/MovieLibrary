const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  release_date: { type: Date, required: true },
  popularity: { type: Number, required: true },
  poster_path: { type: String },
  genre_ids: [{ type: Number, ref: "Genre" }],
});

// Virtual for movie's URL
MovieSchema.virtual("url").get(function () {
  return `/movie/${this._id}`;
});

// Export model
module.exports = mongoose.model("Movie", MovieSchema);
