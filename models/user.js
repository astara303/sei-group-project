const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true , unique: true },
  email: { type: String, required: true , unique: true },
  password: { type: String, required: true }
  // image: { type: String }
})

userSchema.virtual('createdTrails', {
  ref: 'Trail',
  localField: '_id',
  foreignField: 'user'
})

//using this for 'saved' trails
userSchema.virtual('likedTrails', {
  ref: 'Trail',
  localField: '_id',
  foreignField: 'likes.user'
})

//need to hook this up to profile
userSchema.virtual('completedTrails', {
  ref: 'Trail',
  localField: '_id',
  foreignField: 'completion.user'
})

userSchema
  .set('toJSON', {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      delete json.email
      return json
    }
  })

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

userSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('User', userSchema)