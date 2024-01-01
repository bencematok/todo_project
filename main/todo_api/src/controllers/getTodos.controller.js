import { MongoClient } from 'mongodb';

// DB settings in a local environment.
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'react-todo-api';

// Async function for getting every todo from the DB.
export const getTodos = (req, res) => {
    let client;
    const mongo = async () => {
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const todos = await db.collection('todos').find().toArray();
            res.status(200).json(todos);
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: error.message });
        } finally {
            client.close();
        };
    };
    mongo();
};