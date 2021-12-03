"use strict";

const productsUrl = 'http://localhost:3000/products/';
const cartUrl = productsUrl + 'cart';

function initShoppingCart(){
    if(sessionStorage.getItem('shoppingCart') == null){
        let cart = new ShoppingCart();
        writeShoppingCart(cart);
    }
}

function readShoppingCart(){
    //convertir en string cuando se utilice un valor del sessionStorage 
    //que no se utilice JSON parse si se guardó como JSON
    let cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    //console.log(typeof cart);
    return new ShoppingCart(cart._products, cart._productProxies);
}

function writeShoppingCart(cart){
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

initShoppingCart();