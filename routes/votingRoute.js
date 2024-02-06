const { updateOrCreateVoting, countVoting } = require("../controllers/votingController");
const { verifyToken } = require("../middleware/verifyToken");
const router = require("./profileRoute");

router.get('/vote', verifyToken ,countVoting)


// Users can cast their votes for candidates during the specified election period
router.post('/vote', verifyToken ,updateOrCreateVoting)

module.exports = router