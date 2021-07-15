const router = require("express").Router();
const thoughtRoute = require("./Thought-route");
const userRoute = require("./User-route");

router.use("/", thoughtRoute);
router.use("/", userRoute);

module.exports = router;
