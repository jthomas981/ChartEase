const mongoose = require('mongoose')

const flowchartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: {
    type: Object,
    required: [true, 'Please add content to the empty flowchart.'],
  },
  title: {
    type: String,
    required: [true, 'Please add a title.']
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Flowchart', flowchartSchema)