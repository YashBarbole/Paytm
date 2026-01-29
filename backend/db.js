const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://yashbarbole7110_db_user:paytm@paytm.tqtgev1.mongodb.net/");

const userSchema= mongoose.userSchema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
})

const User=mongoose.model("User",userSchema);

module.exports={
    User
}
