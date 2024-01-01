import { MongoClient } from 'mongodb';

// DB settings in a local environment.
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'react-todo-api';

// Async function to delete every entry from the DB.
export const deleteAllTodos = (req, res) => {
    let client;
    const mongo = async () => {
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const response = await db.collection('todos').drop();
            res.status(200).json({ success: true, message: 'Successfully deleted every Todo from the list.', response });
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: error.message });
        } finally {
            client.close();
        }
    };
    mongo();
};