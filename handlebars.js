const express = require('express');
const handlebars = express();
const fetch = require('node-fetch');

handlebars.use(express.static('index'));

handlebars.get('/public', function(request,response) {
    fetch('https://jokservice.herokuapp.com/api/jokes').then(result => {response.json(result)})

});

handlebars.get('/', function (request, response) {
    response.sendStatus(404);
});

let PORT = process.env.PORT || 8080;
handlebars.listen(PORT);