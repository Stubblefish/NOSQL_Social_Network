const { Schema, model } = require("mongoose");
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Please provide us a username with minimum of 2 characters.",
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      unique: true,
      required: "Please provide us valid email address.",
      validate: {
        validator(validateEmail) {
          return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
            validateEmail
          );
        },
        message: "Please enter a valid email address",
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  // gets all the inputs
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // stops virtuals from creating duplicate id's
    id: false,
  }
);

// Virtuals for friends count
UserSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

// User Model using the above schema
const User = model("User", UserSchema);

// Export user model
module.exports = User;
