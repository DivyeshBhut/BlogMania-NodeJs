const {Schema,model} = require("mongoose")
const {createTokenForUser} = require("../services/authentication")
//crypto for hashmap
const { createHmac,randomBytes } = require('node:crypto');

const userSchema = new Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    salt:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    profileImgUrl:{
        type:String,
        default:"https://cdn-icons-png.freepik.com/256/149/149071.png?semt=ais_hybrid"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true});


//In arrow() having the problem of the this Keyword that's why we use the normal()
userSchema.pre("save",function (next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt;
    this.password = hashedPassword;
    next()
})

// Static method to match password
userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email})
    if(!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest("hex")

    if (hashedPassword !== userProvidedHash) {
        throw new Error("Incorrect Password");
    }

    // return {...user.toObject(),password:undefined,salt:undefined}
    const token = createTokenForUser(user);
    return token;
})

const User = model("user",userSchema);

module.exports = User;
