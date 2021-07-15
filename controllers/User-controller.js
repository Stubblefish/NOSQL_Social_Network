const { User } = require("../models");
const Thought = require("../models/Thought");
const { db } = require("../models/User");

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        //allows to remove __v from visuals
        select: "-__v -username",
      })
      .populate({
        path: "friends",
        select: "-__v -thoughts",
      })
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Get one user by id
  getUsersById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        select: "-__v -username",
      })
      .populate({
        path: "friends",
        select: "-__v -thoughts",
      })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Create a new user
  createUsers({ body }, res) {
    // User.findById ({ _id: params.userId })
    User.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Update a user by id
  updateUsers({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Delete a user by id
  deleteUsers({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        return dbUsersData;
      })
      .then((dbUsersData) => {
        User.updateMany(
          { _id: { $in: dbUsersData.friends } },
          { $pull: { friends: params.userId } }
        )
          .then(() => {
            //deletes user's thought associated with id
            Thought.deleteMany({ username: dbUsersData.username })
              .then(() => {
                res.json({ message: "User deleted successfully" });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Create a friend by id
  createFriends({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      // adds new friend to user id, new friend only belongs to that  user
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Delete a friend by id
  deleteFriends({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
