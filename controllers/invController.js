// controllers/invController.js

const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    // Get classification ID from URL
    const classification_id = req.params.classificationId

    // Get inventory data
    const data =
      await invModel.getInventoryByClassificationId(
        classification_id
      )

    // Build vehicle grid
    const grid =
      await utilities.buildClassificationGrid(data)

    // Build navigation
    let nav = await utilities.getNav()

    // Get classification name
    const className =
      data.length > 0
        ? data[0].classification_name
        : "Vehicles"

    // Render classification view
    res.render("inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    console.error(
      "buildByClassificationId error:",
      error
    )
    next(error)
  }
}

module.exports = invCont