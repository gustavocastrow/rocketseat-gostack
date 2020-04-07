const express = require('express');

const app = express();


//ROTA
app.get("/", (request, response) => {
  return response.json({ message: "Hello Gostack", date: "07-04-2020"});

})


app.listen(3333);
