


update();






async function update() {
    document.querySelector('#jokes').innerHTML = '';
    for (let input of document.querySelectorAll('input')) input.value = '';
    getJokes();
 

}

async function getJokes() {
    const [template, userResponse] =
        await Promise.all([fetch('/jokes.hbs'),fetch('https://jokservice.herokuapp.com/api/jokes')]);
    const templeteText = await  template.text();
    const jokes = await userResponse.json();
    const compiledTemplate = Handlebars.compile(templeteText);
    document.querySelector('#messages').innerHTML = compiledTemplate({jokes});
}

