var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PowercutSchema = new Schema({
  
  from: {
    type: Date,
    required: [true, 'from is required']
  },
  to: {
    type: Date,
    required: [true, 'to is required']
  },
  state: {
    type: String,
    max:25,
    required: [true, 'state is required']
  },
  discom: {
     type: String,
     max:25,
     required: [true, 'discom is required']
    },
  feeder: {
      type: String,
      max:25,
      required: [true, 'feeder is required']
    },
  status: {
      type: Number,
      default: '0',
      enum:['0','1','2'], //0-scheduled,1-started,2-passed
      required: [true, 'status is required']      
    },
  createdAt : {
      type: Date,
      default: Date.now
  }
})


var Powercut = mongoose.model('powercut', PowercutSchema)

module.exports = Powercut
