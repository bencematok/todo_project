import { MongoClient } from 'mongodb';

// DB settings in a local environment.
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'react-todo-api';

// Async function for posting an entry into the DB.
export const postTodo = (req, res) => {
    let client;
    const { title } = req.body;
    const mongo = async () => {
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const todo = await db.collection('todos').insertOne({ title, isComplete: false });
            res.status(200).json(todo);
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: error.message });
        } finally {
            client.close();
        };
    };
    mongo();
}