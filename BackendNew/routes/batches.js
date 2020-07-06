const express = require("express");
const router = express.Router();
const batches = require("../controllers/batches.js");

router.post("/", batches.createBatch);

router.get("/", batches.getBatches);

router.get("/:batchId", batches.getBatch);

router.put("/:batchId", batches.updateBatch);

module.exports = router;
