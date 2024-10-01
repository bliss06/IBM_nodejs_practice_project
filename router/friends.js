const express = require("express");

const router = express.Router();

let friends = {
  "johnsmith@gamil.com": {
    firstName: "John",
    lastName: "Doe",
    DOB: "22-12-1990",
  },
  "annasmith@gamil.com": {
    firstName: "Anna",
    lastName: "smith",
    DOB: "02-07-1983",
  },
  "peterjones@gamil.com": {
    firstName: "Peter",
    lastName: "Jones",
    DOB: "21-03-1989",
  },
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  res.send(JSON.stringify(friends));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  const friend = friends[email];

  if (friend) {
    res.send(JSON.stringify(friend));
  } else {
    res.status(404).send("Friend not found");
  }
});

// POST request: Add a new friend
router.post("/", (req, res) => {
  const newFriend = req.body;
  const email = newFriend.email;

  if (email && !friends[email]) {
    friends[email] = {
      firstName: newFriend.firstName,
      lastName: newFriend.lastName,
      DOB: newFriend.DOB,
    };
    res.status(201).send("Friend added successfully");
  } else {
    res.status(400).send("Invalid request or friend already exists");
  }
});

// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  const updatedFriend = req.body;

  if (friends[email]) {
    friends[email] = {
      firstName: updatedFriend.firstName || friends[email].firstName,
      lastName: updatedFriend.lastName || friends[email].lastName,
      DOB: updatedFriend.DOB || friends[email].DOB,
    };
    res.send("Friend updated successfully");
  } else {
    res.status(404).send("Friend not found");
  }
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;

  if (friends[email]) {
    delete friends[email];
    res.send("Friend deleted successfully");
  } else {
    res.status(404).send("Friend not found");
  }
});

module.exports = router;
