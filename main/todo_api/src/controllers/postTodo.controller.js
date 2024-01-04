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
            const todoExists = await db.collection('todos').findOne({ title });
            if (todoExists) {
                res.status(200).json({ success: false, message: 'Todo already exists in the list!' });
            } else {
                const todo = await db.collection('todos').insertOne({ title, isComplete: false });
                res.status(200).json({ success: true, message: 'Todo successfully added to the list.', todo });
            };
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