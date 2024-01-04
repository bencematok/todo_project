import { MongoClient, ObjectId } from 'mongodb';

// DB settings in a local environment.
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'react-todo-api';

// Async function to delete a singular entry from the DB, based on the ID.
export const deleteTodo = (req, res) => {
    const todoId = new ObjectId(req.params._id);
    
    const mongo = async () => {
        let client;
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const todo = await db.collection('todos').deleteOne({ "_id": todoId});
            res.status(200).json({ success: true, message: 'Successfully deleted Todo from the list.', todo });
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ success: false, message: error.message });
        } finally {
            if (client) {
                client.close();
            };
        };
    };
    mongo();
};