import { getFirestoreInstance } from "./utils.js"
import { FieldValue } from "firebase-admin/firestore"

export function getAllTasks(req, res) {
    const db = getFirestoreInstance();
    console.log('------- CONNECTED TO FIRESTORE -------');
    db.collection('tasks').get()
    .then(collection => {
        const tasks = collection.docs.map(doc => ({ taskId: doc.id, ...doc.data() }));
        res.send(tasks);
    })
    .catch(err => res.status(500).json({ error: err.message}));
}

export async function addTask(req, res) {
    const { task } = req.body;
    const newTask = { task, createdAt: FieldValue.serverTimestamp() };
    const db = await getFirestoreInstance();
    db.collection('tasks').add(newTask)
        .then(() => getAllTasks(req, res))
        .catch(err => res.status(500).send({ error: err.message }))
}

export async function updateTask(req, res) {
    const { done } = req.body;
    const { taskId} = req.params;
    const db = await getFirestoreInstance()
    db.collection('tasks').dov(taskId).update({ done })
        .then(() => getAllTasks(req, res))
        .catch(err => res.status(500).send({ error: err.message }))
}