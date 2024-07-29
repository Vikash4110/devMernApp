const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : { 
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false ,
    },   
});

// Secure t he password with bcrypt
userSchema.pre('save', async function (next) {
    // console.log("Pre method :", this);
    const user = this;

    if(!user.isModified("password")) {
        next();
    }

    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
    } catch (error) {
        next(error);
    }
})
// compare the password 
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
} ;
    //Json web token are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on theclient-side (e.g., in cookies or local storage) for later use.

// json web token
userSchema.methods.generateToken = async function() {
try {
    return jwt.sign({
        userId : this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin,
    },
    process.env.JWT_KEY,{
        expiresIn : "30d",
    }
    ); 
} catch (error) {
    console.error(error );
}
}

const User = new mongoose.model("User", userSchema);

module.exports = User; 
