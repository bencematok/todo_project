import express from 'express';
import cors from 'cors';
import { todosRouter } from './src/routes/todosRouter.js';

const PORT = 3000;

const app = express(); // Express module for setting up a server.

app.use(cors()) // Cross Origin Resource Sharing.
app.use(express.urlencoded({extended: false})); // Bodyparser.
app.use(express.json()); // 

app.use('/api/v1/todos', todosRouter); // Todos route.

// Making the server listen for requests.
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});