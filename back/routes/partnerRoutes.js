const express = require("express");
const partnerController = require("../controllers/partnerController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add", auth.authenticateUser, partnerController.createPartner);

router.get("/:id", partnerController.getPartnerById);

router.get("/", partnerController.getAllPartners);
router.put(
  "/update/:id",
  auth.authenticateUser,
  partnerController.updatePartner
);
router.delete(
  "/delete/:id",
  auth.authenticateUser,
  partnerController.deletePartner
);

module.exports = router;
