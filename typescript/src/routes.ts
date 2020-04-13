import{ Request, Response }  from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response){
  const user = createUser({
    email: 'diego@rocketseat.com',
    password: '12324232',
    techs: [
      'Node.js', 
      'ReactJS', 
      'React Native',
      { title: 'Javascript', experience: 100}
    ]

  });

  return response.json({ message: 'Hello World'})
};