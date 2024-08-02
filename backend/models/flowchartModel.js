const mongoose = require('mongoose')

const flowchartSchema = mongoose.Schema({
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