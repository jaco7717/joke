addJoke();
opdater();


async function opdater() {
    document.querySelector('#jokes').innerHTML = '';
    for (let input of document.querySelectorAll('input')) input.value = '';
    getJokes();
    getOtherJokes();


}

async function getJokes() {
    const [template, userResponse] =
        await Promise.all([fetch('/jokes.hbs'),fetch('https://jokservice.herokuapp.com/api/jokes')]);
    const templeteText = await  template.text();
    const jokes = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templeteText);
    document.querySelector('#jokes').innerHTML = compiledTemplate({jokes});
}

async function getOtherJokes() {
    const [template, userResponse] =
        await Promise.all([fetch('/links.hbs'),fetch('https://krdo-joke-registry.herokuapp.com/api/services')]);
    const templeteText = await  template.text();
    const links = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templeteText);
    document.querySelector('#jokesFraAndre').innerHTML = compiledTemplate({links});
}



async function addJoke() {
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
                    opdater();
                return response.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));
    };
}


async function andreJokes(site) {
app.get('/api/otherjokes/' + site, (request, response) => {
    let jokeurl = 'http://' + request.params.site + '.herokuapp.com/api/jokes';
    fetch(jokeurl)
        .then(resultat => resultat.json())

})};

document.getElementById("jokesFraAndre").addEventListener("click", async function(){
    const [template, userResponse] = await Promise.all([fetch('/jokes.hbs'),fetch(this.address + '/api/jokes')]);
    console.log(this.address + '/api/jokes/');
    const templeteText = await  template.text();
    const jokes = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templeteText);
    document.querySelector('#jokesFraAndreJokes').innerHTML = compiledTemplate({jokes});

    ;
});


