"user strict";

const express = require('express');
const router = express.Router();
//const dataHandler = require('../Controllers/subject_handler');

//GET /subjects/
router.route('/').get((req,res) => {
    let query = req.query.filter;
    if (query == undefined) {
        
    }
    try{
        //llamada a datahandler,getProducts()
    } catch (e){
        //Error 
        res.status(400).send('Algo falló');// e.errorMessage);
    }
});

//POST /subjects/
router.route('/').post((req,res) => {
 
});

//GET /subjects/:name
router.route('/:name').get((req,res) => {
    let name = req.params.name;
    //let subject = dataHandler.getProductById(id);
    /*
    if (!subject){
        res.status(404).send("Error 404: Product not found.");
        return;
    }
    else res.status(200).json(product); 
    */    
});

//PUT /subjects/:name
router.route('/:name').put((req,res) => {
    

});

//DELETE /subjects/:name
router.route('/:name').delete((req,res) => {
    let name = req.params.name;
 
});

module.exports = router;