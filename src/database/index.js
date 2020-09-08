const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/provi-challenge',
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true}); // mongodb: host/nome-do-banco

mongoose.Promise = global.Promise;

module.exports = mongoose;
