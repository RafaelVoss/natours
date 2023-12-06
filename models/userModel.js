const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
    maxlength: [40, 'A name must have less or equal 40 characters'],
    minlength: [3, 'A name must have less or equal 3 characters'],
    validate: {
      validator: function (val) {
        // this only works with the current document, therefore it would not work with update user
        // unless the following rule is set: runValidators: true,
        return validator.isAlphanumeric(val.split(' ').join(''));
      },
      message: 'Your name must only contain characters',
    },
  },
  email: {
    type: String,
    required: [true, 'Please provide your e-mail'],
    unique: true,
    lowercase: true,
    maxlength: [40, 'A e-mail must have less or equal 40 characters'],
    minlength: [7, 'A e-mail must have less or equal 7 characters'],
    validate: [validator.isEmail, 'Please provide a valid e-mail'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    maxlength: [40, 'A password must have less or equal 40 characters'],
    minlength: [8, 'A password must have less or equal 8 characters'],
    validate: {
      validator: function (val) {
        return validator.isAlphanumeric(val.split(' ').join(''));
      },
      message: 'A password must only contain characters',
    },
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please comfirm your password'],
    validate: {
      //This only works on .create() & .save(). To update it is reqquired to set: runValidators: true
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Only runs this line of code if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 10000; // to make sure that passwordChangedAt comes before the issuing of jwt
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  // False means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
