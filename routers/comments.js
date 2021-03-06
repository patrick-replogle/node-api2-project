const express = require("express");
const db = require("../data/db.js");

const router = express.Router({
  mergeParams: true
});

//get comments
router.get("/", (req, res) => {
  const { id } = req.params;

  db.findPostComments(id)
    .then(comments => {
      if (comments.length > 0) {
        res.status(200).json(comments);
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

//post a new comment
router.post("/", (req, res) => {
  const comment = {
    text: req.body.text,
    post_id: req.params.id
  };

  if (!req.body.text) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
  db.findById(req.params.id).then(post => {
    if (post.length > 0) {
      db.insertComment(comment)
        .then(obj => {
          db.findCommentById(obj.id).then(com => res.status(201).json(com));
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving the comment to the database"
          });
        });
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  });
});

//async await version of posting comment
// router.post("/", async (req, res) => {
//   const comment = {
//     text: req.body.text,
//     post_id: req.params.id
//   };

//   if (!req.body.text) {
//     return res
//       .status(400)
//       .json({ errorMessage: "Please provide text for the comment." });
//   }
//   try {
//     const newComment = await db.insertComment(comment);
//     res.status(201).json(comment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
