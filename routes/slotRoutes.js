const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/slotController');
router.route('/').get(ctrl.getSlots).post(ctrl.createSlot);
router.route('/:id').get(ctrl.getSlotById).patch(ctrl.updateSlot).delete(ctrl.deleteSlot);
module.exports = router;
