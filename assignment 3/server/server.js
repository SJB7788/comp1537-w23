const express = require('express');
var sessions = require('express-session');
const app = express();

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
app.use(express.json());
app.get('/', (req, res) => {
  req.session.name = req.query.name;
  console.log(req.session);
  res.sendFile(__dirname + '/index.html');
});
