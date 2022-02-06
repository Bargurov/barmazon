export const state =() =>({
    cart:[],
    cartLength:0,
    shippingPrice:0,
    shippingEstimatedDelivery:"",
});

export const actions ={
    addProductToCart({state,commit},{product,qty}){
        const cartProduct = state.cart.find(prod=>prod._id ===product._id);
        if(!cartProduct){
            commit("pushProductToCart",{product,qty});
        }else{
            commit("incrementProductQty",{cartProduct,qty})
        }
        commit("incrementCartLength");
    }
};
export const mutations ={
    pushProductToCart(state,{product,qty}){
        product.quantity = qty ;
        state.cart.push(product)
    },
    incrementProductQty(state,{cartProduct,qty}){
        cartProduct.quantity += qty
        let indexOfProduct = state.cart.indexOf(cartProduct);
        state.cart.splice(indexOfProduct,1,cartProduct);
    },
    incrementCartLength(state){
        state.cartLength = 0;
        if(state.cart.length>0){
            state.cart.map(product=>{
                state.cartLength += product.quantity
            })
        }
    },
    changeQty(state,{product,qty}){
        let cartProduct = state.cart.find(prod=>prod._id ===product._id) 
        cartProduct.quantity = qty;
        state.cartLength = 0;
        if(state.cart.length>0){
            state.cart.map(product=>{
                state.cartLength += product.quantity
            })
        }
        let indexOfProduct = state.cart.indexOf(cartProduct);
        state.cart.splice(indexOfProduct,1,cartProduct)
    },
    removeProduct(state,product){
        state.cartLength -= product.quantity;   
        let indexOfProuct = state.cart.indexOf(product);
        state.cart.splice(indexOfProuct,1);
    },
    setShipping(state,{price,estimatedDelivery}){
        state.shippingPrice=price;
        state.shippingEstimatedDelivery = estimatedDelivery;
    },
    clearCart(state){
        state.cart=[];
        state.cartLength=0;
        state.shippingPrice=0;
        state.shippingEstimatedDelivery="";
    }

};
export const getters = {
    getCartLength(state){
        return state.cartLength
    },
    getCart(state){
        return state.cart;
    },
    getCartTotalPrice(state){
        let total = 0;
        state.cart.map(product=>{
            total +=product.price*product.quantity;
        })
        return total ;
    },
    getCartTotalPriceWithShipping(state){
        let total = 0;
        state.cart.map(product=>{
            total +=product.price*product.quantity;
        })
        return total+state.shippingPrice ;
    },
    getEstimatedDelivery(state){
        return state.shippingEstimatedDelivery
    },
}