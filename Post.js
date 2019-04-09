const fetch = require('node-fetch');

let url = 'https://krdo-joke-registry.herokuapp.com/api/services...';
let data = {name: 'gruppe-død' , address: 'https://jokservice.herokuapp.com/', secret:'pedes'};

fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
})
    .then(resultat => {
        if (resultat.status >= 400)
            throw new Error(resultat.status);
        else
            return resultat.json();
    })
    .then(resultat => console.log(`Resultat: %o`, resultat))
    .catch(fejl => console.log('Fejl: ' + fejl));