import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    dueDate: { type: Date, required: false },
    type: { type: String, enum: ['STORY', 'TASK'], default: 'STORY', required: true },
    points: { type: Number, required: false },
    status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = model('Task', taskSchema);
export default Task;