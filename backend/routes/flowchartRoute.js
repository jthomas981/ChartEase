const express = require('express')
const router = express.Router()
const { 
  getFlowchart, 
  setFlowchart, 
  updateFlowchart, 
  deleteFlowchart 
} = require('../controllers/flowchartController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getFlowchart).post(protect, setFlowchart)
router.route('/:id').put(protect, updateFlowchart).delete(protect, deleteFlowchart)

module.exports = router