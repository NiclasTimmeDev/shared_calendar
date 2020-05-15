const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//================================
/* Create Schema */
//================================
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

//===========================================
/*
Middleware that executes whenever the the user is saved (eg created or updated) and then hashes the password
*/
//===========================================
userSchema.pre("save", async function (next) {
  //check if password was modified
  if (this.isModified("password")) {
    //hash password 8x
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

//Static methods will be available on the Model itself (eg user = User.findByCredentials())

//====================================
/*
Find User by credentials by fist checking the database for an email and then comparing the two password
If the email is not found or the passwords do not match, return false. Else return the user 
*/
//====================================
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return;
  }

  return user;
};

//=======================
/* Create Model */
//=======================
const User = mongoose.model("User", userSchema);

module.exports = User;
