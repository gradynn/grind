import { IoPencil } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";

import { Task } from '@src/models/userData';
import { useState } from "react";

const TypeMarker = ({ type }: { type: string }) => {
    if (type == "STORY") {
        return (<div className="flex justify-center items-center bg-green-500 rounded-sm px-1">
            STORY
        </div>)
    } else if (type == "TASK") {
        return (<div className="flex justify-center items-center bg-yellow-500 rounded-sm px-1">
            TASK
        </div>)
    }
}

const StatusMarker = ({ status }: { status: string }) => {
    if (status == "TODO") {
        return (<div className="flex justify-center items-center bg-gray-500 rounded-sm px-1">
            TODO
        </div>)
    } else if (status == "IN_PROGRESS") {
        return (<div className="flex justify-center items-center bg-primary rounded-sm px-1">
            IN PROGRESS
        </div>)
    } else if (status == "DONE") {
        return (<div className="flex justify-center items-center bg-background-2 text-gray-500 rounded-sm px-1">
            DONE
        </div>)
    }
}

interface TaskItemProps {
    task: Task;
    setEditing: (id: string) => void;
}

const TaskItem = ({ task, setEditing }: TaskItemProps) => {
    const [highlightInteractionItems, setHighlightInteractionItems] = useState(false);

    const handleEditClick = () => {
        setEditing(task.id);
    }

    const handleDeleteClick = () => {
        // Delete
    }

    return (
        <div className={`bg-background text-text rounded-xl p-3 my-3`}
            onMouseEnter={() => setHighlightInteractionItems(!highlightInteractionItems)} 
            onMouseLeave={() => setHighlightInteractionItems(!highlightInteractionItems)}
        >
            <div className='flex w-full items-center justify-between'>
                <div className="flex gap-3">
                    <p className='text-xl'>{task.title}</p>
                    <StatusMarker status={task.status} />
                </div>
                <div className="flex flex-row items-center">
                    <IoPencil onClick={handleEditClick} className={`text-2xl ${highlightInteractionItems ? 'text-gray-300' : 'text-gray-800'} cursor-pointer`}/>
                    <TiDeleteOutline onClick={handleDeleteClick} className={`text-3xl ${highlightInteractionItems ? 'text-error' : 'text-gray-800'} cursor-pointer ml-1`}/>
                </div>
            </div>
            <div className={'my-1 ' + (task.description ? 'text-text' : 'text-gray-500')}>
                {task.description ? task.description : 'Description...'}
            </div>
            <div className="flex w-full justify-end gap-4">
                <TypeMarker type={task.type}/>
                <div className={"" + (task.points != -1 ? 'text-text' : 'text-gray-500')}>{task.points != -1 ? task.points : 0}</div>
            </div>
        </div>
    )
}

export default TaskItem;