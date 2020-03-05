//Chamando o express para um variável 
const express = require('express');
//Iniciando o servidor e chamando as funções do express
const server = express();

//Informando que será utilizado arquivos json
server.use(express.json());

//Criaçao do array de objeto
const projects = [{
  id: "0",
  title: "Meu primeiro projeto",
  tasks: []
}]

//Criando Middlewares

//Contador
let reqCount = 0;

//Middleware global que contabiliza a quantidade de req realizadas
server.use((req, res, next) => {
  next();
  reqCount++;
  console.log(`Numero de requisicoes: ${reqCount}`)
})

//Middleware para controle de rotas que nao tem ID
function checkIndexProject (req, res, next) {
  const indexProject = projects[req.params.id]

  if(!indexProject) {
    return res.status(400).json({ error: "Projeto nao existre, crie um novo"})
  }
  
  return next();
}


//Inserindo projetos no body (INSERT)
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(projects);
})


//Retorna todos os projetos (READ)
server.get('/projects', (req, res ) => {
  return res.json(projects);
});

//Alterando informacoes do projeto (UPDATE)
server.put('/projects/:id', checkIndexProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const task = projects[id].tasks;

  const project = {
    id,
    title,
    tasks: task
  }

  projects[id] = project;
   
  return res.json(projects)
})

//Deletando projeto (DELETE)
server.delete('/projects/:id', checkIndexProject, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);

  return res.send();

})

//Armazenando uma nova tarefa no array de tarefas(tasks)
server.post('/projects/:id/tasks', checkIndexProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.json(projects)
})



server.listen(4444);