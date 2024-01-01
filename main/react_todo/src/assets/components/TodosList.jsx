import Todo from './Todo';

// TodosList component.
export default function TodosList(props) {
    const { todos, getTodos } = props;

    /*
    ** We iterate over the todos. The map function helps us create a list item for each todo.
    ** Since list items need keys to help React identify what changed, we assign the todo._id
    ** to the key. The todo._id is the object's ID in the DB.
    */
    return (
        <>
            <ul className='todo-list'>
                {todos.map(todo => {
                    return (
                        <li key={todo._id} className='todo-wrapper'>
                            <Todo todo={todo} getTodos={getTodos} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
};