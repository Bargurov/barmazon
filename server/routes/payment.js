const router = require('express').Router();
const moment = require('moment');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const Order = require("../models/order");
const verifyToken = require("../middlewares/verify-token");

const SHIPMENT ={
    normal:{
        price:13.99,
        days:7
    },
    fast:{
        price:24.99,
        days:3
    }
}

function shipmentPrice(shipmentOption){ 
    let estimated = moment()
    .add(shipmentOption.days,"d")
    .format("dddd MMMM Do");
    
    return {estimated,price:shipmentOption.price}

}
function todayDate(){ 
    let estimated = moment()
    .format("MMMM Do YYYY");
    
    return estimated

}
router.get('/shipment-today',(req,res)=>{
  let orderDate = todayDate()
  res.json( orderDate)
})

router.post('/shipment',(req,res)=>{
    let shipment ;
    if(req.body.shipment==="normal"){
        shipment = shipmentPrice(SHIPMENT.normal)
    }else{
        shipment = shipmentPrice(SHIPMENT.fast)
    }
    res.json({success:true,shipment:shipment});
})
router.get('/shipment-range',(req,res)=>{
    let shipmentNormal = shipmentPrice(SHIPMENT.normal) ;
    let shipmentfast = shipmentPrice(SHIPMENT.fast) ;
    let shipment = shipmentfast.estimated +" - "+ shipmentNormal.estimated + " 2022"
    res.json({success:true,shipment:shipment});
})

router.post("/payment", verifyToken, (req, res) => {
    let totalPrice = Math.round(req.body.totalPrice * 100);
    stripe.customers
      .create({
        email: req.decoded.email
      })
      .then(customer => {
        return stripe.customers.createSource(customer.id, {
          source: "tok_visa"
        });
      })
      .then(source => {
        return stripe.charges.create({
          amount: totalPrice,
          currency: "usd",
          customer: source.customer
        });
      })
      .then(async charge => {
        let order = new Order();
        let cart = req.body.cart;
  
        cart.map(product => {
          order.products.push({
            productID: product._id,
            quantity: parseInt(product.quantity),
            price: product.price
          });
        });
        order.owner = req.decoded._id;
        order.estimatedDelivery = req.body.estimatedDelivery;
        order.orderDate = req.body.orderDate;
        order.totalPrice = req.body.totalPrice;
        await order.save();
  
        res.json({
          success: true,
          message: "Successfully made a payment"
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });
  });



module.exports = router ;