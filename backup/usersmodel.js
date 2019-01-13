var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema
// var ObjectId = Schema.ObjectId
// var SchemaTypes = mongoose.Schema.Types
// require('mongoose-long')(mongoose)

require('mongoose-type-email')

// schema for social signup's(google,facebook)
var UsersSchemaSocial = new Schema({  
  id: {
    type: String,
    // index: {unique: true}
    // required: [true, 'id is required']    
  },
  // username: {
  //   type: String,
  //   index: {unique: true},
  //   minlength: 5,
  //   maxlength: 10,
  //   validate: {
  //     validator: function (v) {
  //       return /^[A-Za-z]+(?:[-._A-Za-z0-9]+)*$/.test(v) //ex: xyz_50,xyz-51,xyz.aa
  //     },
  //     message: '{VALUE} is not a valid username!'
  //   }
  // },
  displayName: {
    type: String,
    required: [true, 'displayName is required'],
    minlength: 1
  },
  firstname: {
    type: String,
    required: [true, 'firstname is required'],
    minlength: 1,
    maxlength: 15,
  },
  lastname: {
    type: String,
    maxlength: 10,
  },
  // email: {
  //   type: mongoose.SchemaTypes.Email,
  //   index: {unique: true},
  //   minlength: 5,
  //   maxlength: 30,
  //   required: [true, 'email is required']
  // },
  photos: {
    type: String,
  },
  gender: {
    type: String,
    enum:['male','female']
  },
  // mobileno: {
  //   type: String,
  //   index: {unique: true},
  //   validate: {
  //     validator: function (v) {
  //       return /^[0-9]{10}$/.test(v)
  //     },
  //     message: '{VALUE} is not a valid mobile number!'
  //   }
  // },
  token: {
    type: String
  },  
  createdAt : {
    type: Date,
    default: Date.now
  },
  provider: {
    type: String,
    enum:['google','facebook']
  },
})




//user schema
var UsersSchema = new Schema({
  
  username: {
    type: String,
    index: {unique: true},
    required: [true, 'username is required'],
    minlength: 5,
    maxlength: 10,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+(?:[-._A-Za-z0-9]+)*$/.test(v) //ex: xyz_50,xyz-51,xyz.aa
      },
      message: '{VALUE} is not a valid username!'
    }
  },
  firstname: {
    type: String,
    required: [true, 'firstname is required'],
    minlength: 1,
    maxlength: 15,
  },
  middlename: {
    type: String,
    maxlength: 15,
  },
  lastname: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    index: {unique: true},
    minlength: 5,
    maxlength: 20,
    required: [true, 'email is required']
  },
  mobileno: {
    type: String,
    index: {unique: true},
    required: [true, 'mobileno is required'],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v)
      },
      message: '{VALUE} is not a valid mobile number!'
    }
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 8,
    maxlength: 15,
    validate: {
      validator: function (v) { 
        //Minimum eight characters, at least one letter, one number and one special character:
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(v) 
      },
      message: 'Not a valid password!'
    }
  },
  createdAt : {
    type: Date,
    default: Date.now
  },
  occupation: {
    type: String
  },
  city: {
    type: String
  },
  pin: {
    type: Number
  },
  // otherAccounts: [UsersSchemaSocial]










  google : {
    id: {
    type: String,
    // index: {unique: true}
    // required: [true, 'id is required']    
  },
  // username: {
  //   type: String,
  //   index: {unique: true},
  //   minlength: 5,
  //   maxlength: 10,
  //   validate: {
  //     validator: function (v) {
  //       return /^[A-Za-z]+(?:[-._A-Za-z0-9]+)*$/.test(v) //ex: xyz_50,xyz-51,xyz.aa
  //     },
  //     message: '{VALUE} is not a valid username!'
  //   }
  // },
  displayName: {
    type: String,
    required: [true, 'displayName is required'],
    minlength: 1
  },
  firstname: {
    type: String,
    required: [true, 'firstname is required'],
    minlength: 1,
    maxlength: 15,
  },
  lastname: {
    type: String,
    maxlength: 10,
  },
  // email: {
  //   type: mongoose.SchemaTypes.Email,
  //   index: {unique: true},
  //   minlength: 5,
  //   maxlength: 30,
  //   required: [true, 'email is required']
  // },
  photos: {
    type: String,
  },
  gender: {
    type: String,
    enum:['male','female']
  },
  // mobileno: {
  //   type: String,
  //   index: {unique: true},
  //   validate: {
  //     validator: function (v) {
  //       return /^[0-9]{10}$/.test(v)
  //     },
  //     message: '{VALUE} is not a valid mobile number!'
  //   }
  // },
  token: {
    type: String
  },  
  createdAt : {
    type: Date,
    default: Date.now
  },
  provider: {
    type: String,
    enum:['google','facebook']
  }
}
  
});

UsersSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});






var Users = mongoose.model('users_local', UsersSchema,'users')
var Users_social = mongoose.model('users_social', UsersSchemaSocial,'users')

module.exports = {Users, Users_social}
// module.exports = Users