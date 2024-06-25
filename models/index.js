var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Ray:icecreamhyouka@cluster0.stx6kcj.mongodb.net/travel?retryWrites=true&w=majority&appName=Cluster0');

var City = require('./cityModel'),
    User = require('./UserModel'),
    Post = require('./PostModel');

    module.exports.City = City;
    module.exports.User = User;
    module.exports.Post = Post;