const router = require("express").Router();
const verifyToken = require('../middleware/verifyToken')
const entryController = require('../controllers/entries.controllers')


router.post("/", verifyToken, entryController.createEntry)

router.get("/", entryController.getAllEntries)

router.get('/my-entries',verifyToken,entryController.getMyEntries)

router.put('/:entryId',verifyToken,entryController.updateEntry)

router.delete('/:entryId',verifyToken,entryController.deleteEntry) 

module.exports = router;