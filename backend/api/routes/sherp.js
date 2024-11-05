const express = require("express");
const {
  createSherp,
  getAllSherps,
  getSherp,
  updateSherp,
  deleteSherp,
} = require("../controllers/sherps");
const router = express.Router();

router.route("/").get(getAllSherps).post(createSherp);
router.route("/:id").get(getSherp).patch(updateSherp).delete(deleteSherp);

module.exports = router;
