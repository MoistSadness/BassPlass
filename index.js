const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override")

const Product = require("./models/product");
const { findByIdAndDelete } = require("./models/product");

mongoose.connect("mongodb://localhost:27017/bassPlass")
    .then(() => {
        console.log("Connection to DB open");
    })
    .catch(err => {
        console.log("OH NO ERROR");
        console.log(err);
    })

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

/* ROUTING */
app.get("/products", async (req, res) => {
    const foundProducts = await Product.find({});
    //console.log(foundProducts);
    res.render("products/index", { foundProducts });
})

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    //console.log(newProduct);
    //console.log(req.body);
    //res.send("Making your product")
    res.redirect(`/products/${newProduct._id}`);
})

app.get("/products/new", async (req, res) => {
    res.render("products/new");
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    //console.log(product);
    //res.send("Details");
    res.render("products/details", { product });
})

app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product })
})

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {runValidators: true});
    //res.send("PUT");
    res.redirect(`/products/${updatedProduct._id}`);
    //console.log(req.body);
})

app.delete("/products/:id", async (req, res) => {
    //res.send("FDASFSD");
    const {id} = req.params;
    const deletion = await Product.findByIdAndDelete(id);
    //console.log(deletion);
    res.redirect("/products");
})

const port = 3000;
app.listen(port, () => {
    console.log("Listening on port: ", port);
})