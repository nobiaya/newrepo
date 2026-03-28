router.get(
  "/detail/:inv_id",
  utilities.handleErrors(
    inventoryController.buildVehicleDetail
  )
)

/* ***************************
 * Intentional 500 Error Route
 *************************** */
router.get(
  "/trigger-error",
  utilities.handleErrors(
    inventoryController.triggerError
  )
)

router.get(
  "/type/:classification_id",
  utilities.handleErrors(
    inventoryController.buildByClassificationId
  )
)

module.exports = router