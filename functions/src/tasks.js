import { getFirestoreInstance } from "./utils.js"

export function getAllTasks(req, res) {
    const db = getFirestoreInstance()
    console.log('------- CONNECTED TO FIRESTORE -------')
    db.collection('tasks').get()
    .then(collection => {
        const tasks = collection.docs.map(doc => ({ taskId: doc.id, ...doc.data() }));
        res.send(tasks)
    })
    .catch(err => res.status(500).json({ error: err.message}))
}