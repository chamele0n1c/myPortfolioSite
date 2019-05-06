const sqrl = require('squirrelly');
const app = require('express')();
const httpPort = 80;
const sslPort = 443;
const views = {
    index: 'views\\index.sqrl',
};

app.get('/', (req, res) => {
    const rendered = sqrl.renderFile(views.index, {data: "Hello!"});
    res.send(rendered);
});

app.listen(httpPort, () => console.log(`Node Server (NOSSL) listening on port ${httpPort}!`));