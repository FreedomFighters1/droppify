var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send("THIS IS NEW HELLO WORLD");
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`successfully listening on ${port}`);
});