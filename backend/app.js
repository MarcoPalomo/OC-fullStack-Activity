const express = require('express');
const Product = require('./models/product');

//partie pour attaquer mongodb avec mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://', //write your own
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion réussie !'))
  .catch(() => console.log('Echec connexion.'));


const product = express();

product.use(express.json());

//CORS
product.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

product.get('/api/products', (req, res) => {
    products.find({ _id: req.params.id })
      .then(() => res.status(201).json({ products: Product[0] }))
      .catch(error => res.status(400).json({ error }));
});

product.get('/api/products/:id', (req, res) => {
    product.findOne({ _id: req.params.id })
      .then(products => res.status(200).json(products))
      .catch(error => res.status(404).json({ error }));
});

product.post('/api/products', (req, res) => {
  delete req.body._id;
  const products = [
      {
        name: 'cuillere',
        description: 'Les infos de mon premier objet',
        price: 50,
        inStock: true,
      },
    ];
  res.status(201).json({ product: Product });
  //const products = new Product({
  //...req.body
});

product.put('/api/products/:id', (req, res) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified!' }))
    .catch(error => res.status(400).json({ error }));
});

product.delete('/api/products/:id', (req, res) => {
  product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!' }))
    .catch(error => res.status(400).json({ error }));
});

product.use((req, res) => {
  res.json({ message: 'happy using' });
});

module.exports = product;
