const express = require("express");
const { createPatient, getPatients, delPatient, editPatient } = require("../controllers/Patient");
const router = express.Router();
router.route("/entry").post(createPatient);
router.route("/data").get(getPatients);
router.route("/del/:id").delete(delPatient);
router.route("/edit/:id").put(editPatient);
module.exports = router;