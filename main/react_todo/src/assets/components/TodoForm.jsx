import clsx from 'clsx';
import { useState } from "react";
import useFetch from "../hooks/useFetch.hook";
import { useMessage } from "../context/MessageContext";

export default function TodoForm(props) {
    const { getTodos } = props;
    const [title, setTitle] = useState('');
    const { setMessage } = useMessage();
    const { post } = useFetch('http://127.0.0.1:3000/api/v1');

    // Function to change the title state when the input field's value changes.
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    // Async function to post the todo into the DB.
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!title) {
                throw new Error('Title cannot be empty!');
            };
            const response = await post('/todos', { title });
            const data = await response.json();
            setMessage({ success: data.success, message: data.message });
        } catch (error) {
            console.log(error);
            setMessage({ success: error.success, message: error.message });
        } finally {
            getTodos();
        };
    };

    return (
        <>
            <form className="todo-form" onSubmit={handleFormSubmit} >
                <div className="label-wrapper">
                    <label className='label sr-only' htmlFor="title">Title:</label>
                    {/* Input fields have a value property to make them controlled. The onChange function
                    makes sure that value can actually change and is saved into a state. */}
                    <input type="text" value={title} onChange={handleTitleChange} name='title' placeholder="Add item" />
                </div>
                <div className="label-wrapper">
                    <input className='btn btn-submit title--sm m-top-half' type="submit" value="Add" />
                </div>
            </form>
        </>
    )
}