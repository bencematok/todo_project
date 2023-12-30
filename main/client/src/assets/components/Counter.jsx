import Button from './Button';
import useFetch from '../hooks/useFetch.hook';

/*
** The Counter component is responsible for displaying the amount of todos currently on the list.
** The component also has a Button component inside it, which is responsible for deleting every
** todo from the list.
*/
export default function Counter(props) {
    // Deconstructing the todoCount prop for easier readability.
    const { todoCount, getTodos } = props;
    const { deleteAll } = useFetch('http://127.0.0.1:3000/api/v1');


    // Async function to delete every todo in the DB.
    const handleClearClick = async () => {
        try {
            const response = await deleteAll('/todos');
            return response;
        } catch (error) {
            console.error(error.stack);
        } finally {
            getTodos();
        };
    };

    return (
        <>
            <p className='p-x-half m-y-half'>
                {/* In this paragraph, if the todo count is larger than 1 or 0, we add an extra 's' character for the plural form. */}
                You have {todoCount} todo{todoCount > 1 && <span>s</span> || todoCount === 0 && <span>s</span>}.
            </p>
            {/* onDeleteAllClick is passed to the button's onClick event to be able to delete every todo from the list, and consequently the DB. */}
            <Button variant='title--sm btn-submit m-bottom-half' onClick={handleClearClick} >Clear All</Button>
        </>
    )
}