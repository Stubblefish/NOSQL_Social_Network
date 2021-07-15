const router = require("express").Router();
// User Controllers
const {
  getAllUsers,
  createUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
  createFriends,
  deleteFriends,
} = require("../../controllers/User-controller");

// GET all users and POST a new user /api/users
router.route("/users").get(getAllUsers).post(createUsers);

// GET one user, Update user by id, and DELETE user by id /api/users/:userId
router
  .route("/users/:userId")
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

// POST to add a new friend or DELETE to remove a friend from a user's friend list /api/users/:userId/friends/:friendId
router
  .route("/users/:userId/friends/:friendsId")
  .post(createFriends)
  .delete(deleteFriends);

module.exports = router;
