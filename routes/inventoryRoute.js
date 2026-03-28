// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

//route to build vehicle detail view
router.get("/trigger-error", (req, res) => {
  res.status(404).render("errors/404")
})

module.exports = router;