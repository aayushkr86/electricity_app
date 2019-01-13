var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('mongoose-type-email')
// var SchemaTypes = mongoose.Schema.Types
// require('mongoose-long')(mongoose)


var TicketSchema = new Schema({
  
  account: {
    type: String,
    minlength: 5,
    maxlength: 10,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+(?:[-._A-Za-z0-9]+)*$/.test(v) //ex: xyz_50,xyz-51,xyz.aa
      },
      message: '{VALUE} is not a valid username!'
    }
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    minlength: 5,
    maxlength: 30,
    required: [true, 'email is required']
  },  
  mobileno: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v)
      },
      message: '{VALUE} is not a valid mobile number!'
    }
  },
  discom: {
    type: String
  },
  state: {
    type: String
  },
  powerFeeder:{
    type:String
  },
  title: {
    type: String,
    max: 25
  },
  description: {
    type: String,
    max: 200
  },
  photos: {
    type: String,
    default: null
  },  
  createdAt : {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'open',
    enum:['open','inprogress','resolved','unresolved'],
    
  },
})



var Tickets = mongoose.model('tickets', TicketSchema)

module.exports = Tickets
