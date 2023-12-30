import { useState } from "react";
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../hooks/useFetch.hook.js";

/*
** Singular Todo component. This is basically the list item itself.
*/
export default function Todo(props) {
    const { todo, getTodos } = props;
    const [title, setTitle] = useState(todo.title);
    const [isEditing, setIsEditing] = useState(false);
    const { put, remove } = useFetch('http://127.0.0.1:3000/api/v1');

    // Each Todo item has an individual isEditing state to avoid
    // accidentally toggling every other Todo item's edit state.
    const handleEditToggle = () => {
        setIsEditing(prevIsEditing => !prevIsEditing);
    };

    // Function to change the title state when the input field's value changes.
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    // Async function for updating a record in the DB.
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await put(`/todos/${event.target.dataset.id}`, { title });
            return response;
        } catch (error) {
            console.error(error.stack);
        } finally {
            handleEditToggle(); // handleEditToggle in this function toggles back to false, thus displaying the todo instead of an input field.
            getTodos(); // Refetching the todos after editing.
        };
    };

    // Async function to delete a record from the DB.
    const handleDeleteClick = async (event) => {
        try {
            const response = await remove(`/todos/${event.target.dataset.id}`);
            return response;
        } catch (error) {
            console.error(error.stack);
        } finally {
            getTodos(); // Refetching the todos after deleting.
        };
    };

    /*
    ** If isEditing is false, we return the todo itself, along with an edit and a delete button.
    ** If isEditing is true, we return a form with an input field for the new title, along with
    ** a save and a cancel button.
    */
    return (<>
        {!isEditing &&
            <>
                <h2 className='text--bold'>
                    {todo.title}
                </h2>
                <div className="button-container">
                    <Button data-id={todo._id} variant='btn-edit' onClick={handleEditToggle}>
                        <FontAwesomeIcon icon={faCog} />
                    </Button>
                    <Button data-id={todo._id} variant='btn-delete' onClick={handleDeleteClick} >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </>
        }
        {isEditing &&
            <form className="content">
                <div>
                    <label htmlFor="title" className='sr-only'>Title:</label>
                    <input type="text" id='title' name='title' value={title} onChange={handleTitleChange} />
                </div>
                <div className="button-container">
                    <Button data-id={todo._id} type='submit' variant='btn-accept' onClick={handleEditSubmit}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    <Button data-id={todo._id} variant='btn-delete' onClick={handleEditToggle}>
                        <FontAwesomeIcon icon={faX} />
                    </Button>
                </div>
            </form>
        }
    </>)
}