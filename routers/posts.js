const express = require("express");
const commentsRouter = require("./comments.js");
const db = require("../data/db.js");

const router = express.Router();

router.use("/:id/comments", commentsRouter);

//get all posts
router.get("/", (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The posts information could not be retrieved."
      });
    });
});

//get posts by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The post information could not be retrieved."
      });
    });
});

//create a new post
router.post("/", (req, res) => {
  const body = req.body;

  if (!body.title || !body.contents) {
    res
      .status(400)
      .json({ errMessage: "Please provide title and contents for the post" });
  } else {
    db.insert(body)
      .then(post => {
        res.status(201).json({ success: true, post });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

//update a post and send back the modified object
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  if (!updated.title || !updated.contents) {
    return res.status(404).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.findById(id)
      .then(post => {
        if (post) {
          return db.update(id, updated);
        } else {
          res.status(404).json({
            success: false,
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .then(() => db.findById(id))
      .then(post => res.json(post))
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The post information could not be modified."
        });
      });
  }
});

//delete a post
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
        return db.remove(id).then(() => res.json(post));
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })

    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The post could not be removed"
      });
    });
});

module.exports = router;
