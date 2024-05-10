import mongoose, { now } from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    dueDate: { type: Date, required: false },
    type: { type: String, enum: ['STORY', 'TASK'], required: true, default: 'STORY' },
    points: { type: Number, required: false },
    status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], required: true, default: 'TODO' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = model('Task', taskSchema);
export default Task;