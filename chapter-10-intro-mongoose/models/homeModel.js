const { default: mongoose } = require("mongoose");
const Favourite = require('./favModel')

const homeSchema = new mongoose.Schema({
  image: String,
  houseName: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: String, required: true },
  description: String,
})


homeSchema.pre('findOneAndDelete', async function (next) {
  const homeId = this.getQuery()._id
  await Favourite.deleteMany({ homeId: homeId });
  next()
})

module.exports = mongoose.model('Home', homeSchema)