

saveJoke();
update();
createService();





async function update() {
    document.querySelector('#jokes').innerHTML = '';
    for (let input of document.querySelectorAll('input')) input.value = '';
    getJokes();
    getOtherSites();

}

async function getJokes() {
    const [template, userResponse] =
        await Promise.all([fetch('/jokes.hbs'),fetch('https://jokservice.herokuapp.com/api/jokes')]);
    const templeteText = await  template.text();
    const jokes = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templeteText);
    document.querySelector('#jokes').innerHTML = compiledTemplate({jokes});
}

async function getOtherSites() {
    const [template,userResponse] = await Promise.all([fetch('/otherSites.hbs'),fetch('/api/othersites')]);
    const templateText = await template.text();
    const otherSite = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.querySelector('#otherSites').innerHTML = compiledTemplate({otherSite});
}

async function saveJoke() {
    document.querySelector('#saveJoke').onclick = () =>{
        const msg = {
            setup: document.querySelector('#setup').value,
            punchline: document.querySelector('#punchline').value
        };
        fetch('/api/jokes',{
            method: "POST",
            body: JSON.stringify(msg),
            headers: {'Content-Type':'application/json'}
        })

            .then(response => {
                if(response.status>=400)
                    throw new Error(response.status);
                else
                    update();
                return response.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));
    };
}

async function createService() {
    const msg = {name: 'Ridiculum Service', address: 'https://ridiculum-service.herokuapp.com', secret: '18vDIP'};
    fetch('https://krdo-joke-registry.herokuapp.com/api/services',{
        method: "POST",
        body: JSON.stringify(msg),
        headers: {'Content-Type':'application/json'}
    })

        .then(response => {
            if(response.status>=400)
                throw new Error(response.status);
            else
                update();
            return response.json();
        })
        .then(resultat => console.log(`Resultat: %o`, resultat))
        .catch(fejl => console.log('Fejl: ' + fejl));
}