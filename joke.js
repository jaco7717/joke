const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const express = require('express');
const app = express();
app.use(express.json());
const fetch = require('node-fetch');


mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://emillouvmand:UXRYzVDa1nR7kHzX@jacob-otbax.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

app.use(express.static('public'));


 onload = async () => {
     const [template, response] =
         await Promise.all([fetch('/jokes.hbs'), fetch('https://jokservice.herokuapp.com/api/jokes')]);
     const templateText = await template.text();
     const messages = await response.json();
     const compiledTemplate = Handlebars.compile(templateText);
     document.body.innerHTML = compiledTemplate({messages});
 };




const messageSkema = new Schema({
    setup: String,
    punchline: String
});

const messageModel = mongoose.model('brugere', messageSkema);

// GET /api/jokes

app.get('/api/jokes', async (request, response) => {
    response.json(await messageModel.find().exec())

});


// GET /api/othersites

let url = 'https://krdo-joke-registry.herokuapp.com/api/services';

app.get('/api/othersites', (request, response) => {
    fetch(url)
        .then(resultat => resultat.json())
        .then(resultat => response.send(resultat))

});

// GET /api/otherjokes/:site

app.get('/api/otherjokes/:site', (request, response) => {
    let id = request.params.site;




    fetch(url)
        .then(result => result.json())
        .then(sites => {
            console.log(sites);
            let site = sites.find(site => id === site._id);
            console.log(site);
            if(site) {
                if (site.address[site.address.length -1] !== '/') {
                    site.address += '/';
                }
                let jokeurl = site.address + 'api/jokes';
                fetch(jokeurl)
                    .then(resultat => resultat.json())
                    .then(resultat => response.send(resultat))
            } else {
                response.sendStatus(404);
            }
        });


});


// POST /api/jokes

app.post('/api/jokes', (request, response) => {
    let msgObj = request.body;

    if (msgObj.setup) {
        let message = new messageModel({
            setup: msgObj.setup,
            punchline: msgObj.punchline,
        });


        message.save();

        response.status(200).send("Message sent")

    }
});

app.delete('/api/jokes/:id', (request, response) => {
    for (let i of array) {

        if (request.body.tekst === i.id) {
            let index = array.indexOf(i);
            array.splice(index, i);


        }
    }
});

app.put('/api/jokes/:id', (request, response) => {

});


let PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log("starter");