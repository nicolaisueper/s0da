const { createProxyMiddleware } = require("http-proxy-middleware");
const Bundler = require("parcel-bundler");
const express = require("express");
const opn = require("opn");

let bundler = new Bundler("src/frontend/index.html", {
    sourceMaps: true,
    detailedReport: true,
    autoinstall: false
});

let app = express();

app.use('/api', createProxyMiddleware('http://localhost:3000'));

app.use(bundler.middleware());

app.listen(8080, () => {
    opn("http://localhost:8080").catch(e => {
        console.error(e);
    });
});
