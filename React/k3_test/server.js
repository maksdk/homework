
const express = require ('express');
const open = require( 'open');
const config = require('./webpack.config.js');
const webpack = require ('webpack');

const port = 8080;
const app = express();
const compiler = webpack(config);

const fs = require("fs");

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(express.static(__dirname + "/public"));

app.get("/api/data", function (req, res) {
    let content = fs.readFileSync("./src/data/data.json", "utf8");
    let data = JSON.parse(content);
    res.send(data);
});
app.listen(port, function (error) {
    if(error) {
        console.log(error);
    } else {
        open(`http://localhost:${port}`)
    }
});
