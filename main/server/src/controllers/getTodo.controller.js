import { MongoClient, ObjectId } from 'mongodb';

// DB settings in a local environment.
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'react-todo-api';

// Async function to get an individual todo, based on the ID.
export const getTodo = (req, res) => {
    let client;
    const todoId = new ObjectId(req.body.id);
    const mongo = async () => {
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const todo = db.collection('todos').findOne({ _id: todoId });
            res.status(200).json(todo);
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: error.message });
        } finally {
            client.close();
        };
    };
    mongo();
};