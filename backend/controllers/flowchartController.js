const asyncHandler = require('express-async-handler')

// @desc    Get a user's flowchart.
// @route   GET /api/flowchart
// @access  Private
const getFlowchart = asyncHandler(async (req, res) => {
  res.status(200).json({ messgae: "Get flowcharts" })
})

// @desc    Create a flowchart.
// @route   POST /api/flowchart
// @access  Private
const setFlowchart = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field.')
  }

  res.status(200).json({ messgae: "Set flowcharts" })
})

// @desc    Update a user's flowchart.
// @route   PUT /api/flowchart/:id
// @access  Private
const updateFlowchart = asyncHandler(async (req, res) => {
  res.status(200).json({ messgae: `Update flowchart ${req.params.id}` })
})

// @desc    Delete a user's flowchart.
// @route   DELETE /api/flowchart/:id
// @access  Private
const deleteFlowchart = asyncHandler(async (req, res) => {
  res.status(200).json({ messgae: `Delete flowchart ${req.params.id}` })
})

module.exports = {
  getFlowchart,
  setFlowchart,
  updateFlowchart,
  deleteFlowchart
}