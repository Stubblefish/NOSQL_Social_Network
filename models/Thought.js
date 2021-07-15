const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
// const ReactionSchema = require('./Reaction');

const ReactionSchema = new Schema(
  {
    // set custom id not be confused with the parent _id

    reactionId: {
      // configuration for a path in a schema.
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "Enter a reaction.",
      trim: true,
      // allows a min of 2 and max of 280 characters on the body
      minLength: [2, "Reaction too short, needs at least 2 characters"],
      maxLength: [280, "Reaction too long, needs no more than 280 characters"],
    },
    username: {
      type: String,
      required: "Enter your username.",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValidator) => dateFormat(createdAtValidator),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Enter a thought.",
      trim: true,
      // allows a min of 2 and max of 280 characters on the body
      minLength: [2, "Thought too short, needs at least 2 characters"],
      maxLength: [280, "Thought too long, needs no more than 280 characters"],
    },
    createdAt: {
      // get the current date & time.
      type: Date,
      default: Date.now,
      get: (createdAtValidator) => dateFormat(createdAtValidator),
    },
    username: {
      type: String,
      required: "Enter your username.",
      minLength: 2,
      maxlength: 100,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
