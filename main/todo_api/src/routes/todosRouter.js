import express from 'express';
import { getTodo } from '../controllers/getTodo.controller.js';
import { getTodos } from '../controllers/getTodos.controller.js';
import { postTodo } from '../controllers/postTodo.controller.js';
import { putTodo } from '../controllers/putTodo.controller.js';
import { deleteTodo } from '../controllers/deleteTodo.controller.js';
import { deleteAllTodos } from '../controllers/deleteAllTodos.controller.js';

export const todosRouter = express.Router();

// Route for all todos in the DB.
todosRouter.route('/').get(getTodos).post(postTodo).delete(deleteAllTodos);
// Routes for individual todos based on the ID parameter.
todosRouter.route('/:_id').get(getTodo).put(putTodo).delete(deleteTodo);