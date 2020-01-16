const express = require("express");
const db = require("../data/db.js");

const router = express.Router({
  mergeParams: true
});

router.get("/", (req, res) => {
  const { id } = req.params;

  db.findPostComments(id)
    .then(data => {
      if (data) {
        return res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The comments information could not be retrieved."
      });
    });
});

module.exports = router;
