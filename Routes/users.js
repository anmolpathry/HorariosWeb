"user strict";

const express = require('express');
const router = express.Router();
//const dataHandler = require('../Controllers/user_handler');

//GET /users/
router.route('/').get((req,res) => {
    let query = req.query.filter;
    if (query == undefined) {
        
    }
    try{
        //llamada a datahandler,getUsers()
    } catch (e){
        //Error 
        res.status(400).send('Algo falló');// e.errorMessage);
    }
});

//POST /users/
router.route('/').post((req,res) => {
 
});

//GET /users/:email
router.route('/:email').get((req,res) => {
    let email = req.params.email;
    //let user = dataHandler.getProductById(id);
    /*
    if (!user){
        res.status(404).send("Error 404: Product not found.");
        return;
    }
    else res.status(200).json(product); 
    */    
});

//PUT /users/:email
router.route('/:email').put((req,res) => {
    

});

module.exports = router;