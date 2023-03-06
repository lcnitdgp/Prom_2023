const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerSchema = new Schema({
  students:[
    {
        type:Schema.Types.ObjectId,
        ref:"Student",
    }
  ],
  payTo: String,
  paymentProof:String,

});

module.exports = mongoose.model("Partner", partnerSchema);
