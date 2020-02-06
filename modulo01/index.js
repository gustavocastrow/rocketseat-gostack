const express = require('express'); // Importando express.
const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Gustavo", "email": "gustavocastro@gmail.com"}

//CRUD = Create, Read, Update, Delete
const users = ['Pedro', 'Claudio', 'Victor']


//Middleware global
server.use((req,res,next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url};`);
  
  next();

  console.timeEnd('Request');
})

function checkUserExists(req, res, next) {
  if(!req.body.name){
    return res.status(400).json({ error: 'User not found on request body'})
  }

  return next();
}

function checkUserInArray(req, res, next){
  const user = users[req.params.index];
  if(!user){
    return res.status(400).json({error:'User does not exists'});
  }

  req.user = user;

  return next();
}

//Retorna todos os usuários
server.get('/users',  (req, res) => {
  return res.json(users) 

})

server.get('/users/:index', checkUserInArray, (req, res) => {
   //localhost:3000/users/23432
  return res.json(req.user)
})

//Criação de um usuário 

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

//Edição de um usuário

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

//Excluindo usuário

server.delete('/users/:index', checkUserInArray, (req, res) =>{
  const { index } = req.params;
  users.splice(index, 1);

  return res.send();
})

server.listen(3000); //Porta que o servidor será chamado