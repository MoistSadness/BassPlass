const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose.connect("mongodb://localhost:27017/bassPlass")
.then(() => {
    console.log("Connection to DB open");
})
.catch(err => {
    console.log("OH NO ERROR");
    console.log(err);
})

/*
const p = new Product({
    name: "P bass",
    price: 1300,
    description: "Expensive P bass"
})

p.save().then(p => {
    console.log(p);
}).catch(e => {
    console.log(e);
})
*/

const seedProducts = [
    {
        name: "Jazz bass for sale",
        price: 2270,
        description: "Gently used",
        category: "jazz bass"
    } ,
    {
        name: "Not sure what this is",
        price: 0,
        description: "I just need to get rid of it"
    } 
]
Product.insertMany(seedProducts).then( res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})