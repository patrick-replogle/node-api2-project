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
  const body = req.body;
  const { id } = req.params;

  if (!body.text) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.findCommentById(id)
      .then(data => {
        if (data.length > 0) {
          db.insertComment(body);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .then(() => db.findCommentById(id))
      .then(data => res.status(201).json(data))
      .catch(err => {
        res.status(500).json({
          success: false,
          message: "Could not create hub messages"
        });
      });
  }
});

// router.post("/", (req, res) => {
//   // const id = req.params.id;
//   const data = req.body;
//   if (!data.text) {
//     res
//       .status(400)
//       .json({ errorMessage: "Please provide text for the comment." });
//   } else {
//     db.insertComment(data)
//       .then(comment => {
//         if (comment) {
//           res.status(201).json(comment);
//         } else {
//           res.status(404).json({
//             errorMessage: "The post with the specified ID does not exist."
//           });
//         }
//       })
//       .catch(error => {
//         console.timeLog("error on POST /api/posts/:id/comments", error);
//         res.status(500).json({
//           errorMessage:
//             "There was an error while saving the comment to the database"
//         });
//       });
//   }
// });

module.exports = router;
