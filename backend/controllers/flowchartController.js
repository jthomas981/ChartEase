const asyncHandler = require('express-async-handler')

const Flowchart = require('../models/flowchartModel')
const User = require('../models/userModel')

// @desc    Get a user's flowchart.
// @route   GET /api/flowchart
// @access  Private
const getFlowchart = asyncHandler(async (req, res) => {
  const flowcharts = await Flowchart.find({ user: req.user.id })

  res.status(200).json(flowcharts)
})

// @desc    Create a flowchart.
// @route   POST /api/flowchart
// @access  Private
const setFlowchart = asyncHandler(async (req, res) => {
  if (!req.body.content) {
    res.status(400)
    throw new Error('Please submit a non-empty flowchart.')
  }
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please enter a title.')
  }

  const flowchart = await Flowchart.create({
    user: req.user.id,
    content: req.body.content,
    title: req.body.title,
  })

  res.status(200).json(flowchart)
})

// @desc    Update a user's flowchart.
// @route   PUT /api/flowchart/:id
// @access  Private
const updateFlowchart = asyncHandler(async (req, res) => {
  const flowchart = await Flowchart.findById(req.params.id)

  if (!flowchart) {
    res.status(400)
    throw new Error('Flowchart not found.')
  }

  // Check for user.
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Flowchart user must match logged in user.
  if (flowchart.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized.')
  }

  const updatedFlowchart = await Flowchart.findByIdAndUpdate(
    req.params.id, 
    req.body,
    { new: true }
  )

  res.status(200).json(updatedFlowchart)
})

// @desc    Delete a user's flowchart.
// @route   DELETE /api/flowchart/:id
// @access  Private
const deleteFlowchart = asyncHandler(async (req, res) => {
  const flowchart = await Flowchart.findById(req.params.id)

  if (!flowchart) {
    res.status(400)
    throw new Error('Flowchart not found.')
  }

  // Check for user.
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Flowchart user must match logged in user.
  if (flowchart.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized.')
  }
  
  await Flowchart.deleteOne({ _id: req.params.id })

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getFlowchart,
  setFlowchart,
  updateFlowchart,
  deleteFlowchart
}