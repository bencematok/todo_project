import { useState, useEffect } from 'react';
import { MessageProvider } from './assets/context/MessageContext';
import useFetch from './assets/hooks/useFetch.hook';
import './App.css';
import Container from './assets/components/Container';
import Counter from './assets/components/Counter';
import Message from './assets/components/Message';
import TodoForm from './assets/components/TodoForm';
import TodosList from './assets/components/TodosList';


function App() {
  // States for the various form inputs.
  const [todos, setTodos] = useState([]);

  // Custom useFetch hook for CRUD actions.
  const { get } = useFetch('http://127.0.0.1:3000/api/v1');

  // useEffect to get the todos from the DB on component mount.
  useEffect(() => {
    getTodos();
  }, [])

  // getTodos function for getting the todos from the DB.
  const getTodos = async () => {
    try {
      const response = await get('/todos');
      setTodos(response);
    } catch (error) {
      console.error(error.stack);
    };
  };

  return (
    <>
      <MessageProvider>
        <Container variant='todo-background'>
          <h1 className='title--bold text-center m-y-1'>Todo App</h1>
          <TodoForm getTodos={getTodos} />
          <Message />
          <TodosList todos={todos} getTodos={getTodos} />
          <Counter todoCount={todos.length} getTodos={getTodos} />
        </Container>
      </MessageProvider>
    </>
  )
}

export default App
