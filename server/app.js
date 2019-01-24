const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../client-web/build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client-web/build', 'index.html'));
});

app.listen(9000);