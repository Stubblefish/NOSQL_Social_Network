const router = require("express").Router();
const {
  getAllThoughts,
  createThoughts,
  getThoughtsById,
  updateThoughts,
  deleteThoughts,
  createReactions,
  deleteReactions,
} = require("../../controllers/Thought-controller");

// GET and POST new thoughts
router.route("/thought").get(getAllThoughts).post(createThoughts);

// GET thought by id, PUT update a thought by id, and DELETE a thought by id at /api/thoughts/:thoughtId
router
  .route("/thought/:thoughtId")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// POST a reaction to a thought at /api/thoughts/:thoughtId/reactions
router.route("/thought/:thoughtId/reactions").post(createReactions);

// DELETE a reaction to a thought at /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/thought/:thoughtId/reactions/:reactionId")
  .delete(deleteReactions);

module.exports = router;
