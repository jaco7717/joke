

onload = async () => {
    const [template, response] =
        await Promise.all([fetch('/jokes.hbs'), fetch('/api/jokes')]);
    const templateText = await template.text();
    const messages = await response.json();
    const compiledTemplate = Handlebars.compile(templateText);
    document.body.innerHTML = compiledTemplate({messages});
};