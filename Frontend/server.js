const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT_CONTRATUAL_FRONTEND_SERVER, 10);
const url = `http://contratual.kinghost.net:${process.env.PORT_CONTRATUAL_FRONTEND_SERVER}`
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at ${url}`
  );
});