import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req,res){
    await initMongoose();

    if(req.method !== 'POST'){
        res.json('should be a post but it is not').send();
        return ;
    }
    const {email,name,address,city}=req.body
    const productIds=req.body.products.split(',');
    const uniquIds=[... new Set(productIds)];
    const products= await Product?.find({_id:{$in:uniquIds}}).exec();

    let line_items=[]
    for(let productId of uniquIds){

      const quantity=productIds.filter(id=>id===productId).length;
      const product=products.find(p=>p._id.toString()===productId)
      
      line_items.push({
        quantity,
        price_data:{
          currency:'INR',
          product_data:{name:product.name},
          unit_amount:product.price*100,
          metadata:{orderId:Order._id?.toString()},
        },
      })
    }
    await Order.create({
      products:line_items,
      name,
      email,
      city,
      address,
      paid:0
    })
    const session = await stripe.checkout.sessions.create({
        line_items: line_items, 
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
}
