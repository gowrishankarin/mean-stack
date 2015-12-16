var mongoose = require('mongoose')
var productSchema = require("./product.js")

var Product = mongoose.model('Product', productSchema);

var p = new Product({
    name: 'test',
    price: {
        amount: 5,
        currency: 'USD'
    },
    category: {
        name: 'test'
    }
});

p.name = 2;
console.log(p.name);
console.log(p.$isValid('name'));


p.price.amount = 'Not a number';
p.validate(function(err) {
    // CastError because `price.amount` couldnt be
    // casted to a number
    console.log(err);
});


console.log(p.displayPrice);

p.price.amount = 20;
console.log(p.displayPrice);

console.log(JSON.stringify(p));

var obj = p.toObject();
console.log(obj.displayPrice);
