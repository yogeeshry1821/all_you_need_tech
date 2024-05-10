const { model,models,Schema } = require("mongoose");

const OrderSchema= new Schema({
    products:Object,
    name:String,
    address:String,
    email:String,
    city:String,
    paid:{
        type:Number,
        defaultValue:0
    },

},{timestamps:true})

const Order= models?.Order || model('Order',OrderSchema,'orders');

export default Order;