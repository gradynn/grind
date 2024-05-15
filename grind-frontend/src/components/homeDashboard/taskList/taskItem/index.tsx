import { Task } from '@src/models/userData';

const TaskItem = ({ task }: {task: Task}) => {
    console.log(task);
    return (
        <div>
            <div className="flex flex-row justify-between w-full">
                <p className="text-text">{task.title}</p>
                <p className="text-text">{task.dueDate}</p>
            </div>
            <div className="w-full h-0.5 bg-background-3 my-2"></div>
        </div>
    )
}

export default TaskItem;