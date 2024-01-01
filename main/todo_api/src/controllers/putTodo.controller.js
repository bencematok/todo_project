import { MongoClient, ObjectId } from 'mongodb';

// DB settings in a local environment.
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'react-todo-api';

// Async function to update an entry in the DB, based on the ID.
export const putTodo = (req, res) => {
    const { title, description, isComplete } = req.body;
    
    const todoId = new ObjectId(req.params._id);
    console.log(todoId);
    let client;
    const mongo = async () => {
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const todo = await db.collection('todos').findOneAndUpdate({ _id: todoId}, {$set: { title }});
            res.status(200).json({ success: true, message: 'Successfully modified Todo.', todo });
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: error.message });
        } finally {
            client.close();
        };
    };
    mongo();
}