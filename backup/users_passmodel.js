// var mongoose = require('mongoose')
// var Schema = mongoose.Schema
// require('mongoose-type-email')
// // var SchemaTypes = mongoose.Schema.Types
// // require('mongoose-long')(mongoose)


// var UsersSchema = new Schema({
  
//   id: {
//     type: String,
//     index: {unique: true},
//     required: [true, 'id is required']    
//   },
//   username: {
//     type: String,
//     index: {unique: true},
//     minlength: 5,
//     maxlength: 10,
//     validate: {
//       validator: function (v) {
//         return /^[A-Za-z]+(?:[-._A-Za-z0-9]+)*$/.test(v) //ex: xyz_50,xyz-51,xyz.aa
//       },
//       message: '{VALUE} is not a valid username!'
//     }
//   },
//   displayName: {
//     type: String,
//     required: [true, 'displayName is required'],
//     minlength: 1
//   },
//   firstname: {
//     type: String,
//     required: [true, 'firstname is required'],
//     minlength: 1,
//     maxlength: 15,
//   },
//   lastname: {
//     type: String,
//     maxlength: 10,
//   },
//   email: {
//     type: mongoose.SchemaTypes.Email,
//     index: {unique: true},
//     minlength: 5,
//     maxlength: 30,
//     required: [true, 'email is required']
//   },
//   photos: {
//     type: String,
//   },
//   gender: {
//     type: String,
//     enum:['male','female']
//   },
//   mobileno: {
//     type: String,
//     index: {unique: true},
//     validate: {
//       validator: function (v) {
//         return /^[0-9]{10}$/.test(v)
//       },
//       message: '{VALUE} is not a valid mobile number!'
//     }
//   },
//   token: {
//     type: String
//   },  
//   createdAt : {
//     type: Date,
//     default: Date.now
//   },
//   occupation: {
//     type: String
//   },
//   city: {
//     type: String
//   },
//   pin: {
//     type: Number
//   },
//   provider: {
//     type: String,
//     enum:['google','facebook']
//   },
// })



// var Users_social = mongoose.model('users', UsersSchema)

// module.exports = Users_social
