

onload = async () => {
    const [template, response] =
        await Promise.all([fetch('/files.hbs'), fetch('http://localhost:8080/filer')]);
    const templateText = await template.text();
    const messages = await response.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.body.innerHTML = compiledTemplate({messages});
};


