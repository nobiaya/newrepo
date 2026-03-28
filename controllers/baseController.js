const utilities = require("../utilities/")

const baseController = {}

/* ***************************
 * Build Home View
 * ************************** */
baseController.buildHome = async function (req, res) {
  try {
    // Get navigation
    let nav = await utilities.getNav()

    // Render home page
    res.render("index", {
      title: "Home",
      nav,
    })
  } catch (error) {
    console.error("buildHome error:", error)
    res.status(500).send("Server Error")
  }
}

module.exports = baseController

