const express = require('express')
const router = express.Router()
const { 
  getFlowchart, 
  setFlowchart, 
  updateFlowchart, 
  deleteFlowchart 
} = require('../controllers/flowchartController')

router.route('/').get(getFlowchart).post(setFlowchart)
router.route('/:id').put(updateFlowchart).delete(deleteFlowchart)

module.exports = router