const express = require('express');

const app = express();


//ROTA
app.get("/", (request, response) => {
  return response.json({ message: "Hello Gostack <3", date: "07-04-2020"});

})


app.listen(3333, () => {
  console.log('🚀 Back-end started!');

});
