"user strict";

const express = require('express');
const router = express.Router();
//const dataHandler = require('../Controllers/class_handler');

//GET /classes/
router.route('/').get((req,res) => {
    let query = req.query.filter;
    if (query == undefined) {
        
    }
    try{
        //llamada a datahandler,getClasses()
    } catch (e){
        //Error 
        res.status(400).send('Algo falló');// e.errorMessage);
    }
});

//POST /classes/
router.route('/').post((req,res) => {
 
});

//GET /classes/:code
router.route('/:code').get((req,res) => {
    let code = req.params.code;
    //let class = dataHandler.getProductById(id);
    /*
    if (!class){
        res.status(404).send("Error 404: Product not found.");
        return;
    }
    else res.status(200).json(product); 
    */    
});

//PUT /classes/:code
router.route('/:code').put((req,res) => {
    

});

//DELETE /classes/:code
router.route('/:code').delete((req,res) => {
    let code = req.params.code;
 
});

module.exports = router;