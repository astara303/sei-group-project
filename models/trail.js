const mongoose = require('mongoose')

//have not added comments to front-end yet
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
} , {
  timestamps: true
})

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

//our completion form that will be accessed from the SHOW page and then added to the trailSchema
const completionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true 
})

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  directions: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  clueOne: { type: String, required: true },
  clueTwo: { type: String },
  clueThree: { type: String },
  image: { type: String },
  weatherFactor: { type: Boolean, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ],
  likes: [ likeSchema ],
  completion: [ completionSchema ]
}, {
  timestamps: true
})

trailSchema
  .virtual('likeCount')
  .get(function() {
    return this.likes.length
  })

trailSchema.set('toJSON', { virtuals: true })

trailSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Trail', trailSchema)