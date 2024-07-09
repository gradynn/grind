import { useRef, useState, useEffect, useCallback } from "react";
import { Task } from '@src/models/userData';
import { RiSaveLine } from "react-icons/ri";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useAuth } from "@src/utils/useAuth";
import { updateTask } from "@src/services/backend.service";

const TypeMarker = ({ type, onChange }: { type: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
    <select name="type" value={type} onChange={onChange} className="bg-primary rounded-sm px-1">
        <option value="STORY">STORY</option>
        <option value="TASK">TASK</option>
    </select>
);

const StatusMarker = ({ status, onChange, width }: { status: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, width: string }) => (
    <select name="status" value={status} onChange={onChange} style={{ width }} className="rounded-sm px-1 bg-primary">
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
    </select>
);

interface TaskItemProps {
    task: Task;
    setEditing: (id: string | null) => void;
}

const EditableTaskItem = ({ task, setEditing }: TaskItemProps) => {
    const { token } = useAuth();
    
    const [taskUpdate, setTaskUpdate] = useState(task);

    const [titleWidth, setTitleWidth] = useState(0);
    const spanRef = useRef<HTMLSpanElement>(null);

    const [statusWidth, setStatusWidth] = useState(0);
    const statusRef = useRef<HTMLSpanElement>(null);

    const handleSaveClick = async () => {
        setEditing(null);
        await updateTask(token || '', taskUpdate);
        window.location.reload();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskUpdate({ ...taskUpdate, [name]: value });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskUpdate({ ...taskUpdate, description: e.target.value });
    };

    const handlePointsChange = useCallback((increment: boolean) => {
        setTaskUpdate((prevTask) => {
            let newValue = increment ? prevTask.points + 1 : prevTask.points - 1;
            if (newValue < -1) newValue = -1;
            if (newValue > 12) newValue = 12;
            return { ...prevTask, points: newValue };
        });
    }, []);

    useEffect(() => {
        if (spanRef.current) {
            setTitleWidth(spanRef.current.offsetWidth + 20);
        }
    }, [taskUpdate.title]);

    useEffect(() => {
        if (statusRef.current) {
            setStatusWidth(statusRef.current.offsetWidth + 30);
        }
    }, [taskUpdate.status]);

    return (
        <div className='bg-background text-text rounded-xl shadow p-3 my-3'>
            <div className='flex w-full items-center justify-between'>
                <div className="flex gap-3">
                    <input
                        name="title"
                        onChange={handleChange}
                        value={taskUpdate.title}
                        className="bg-background text-xl"
                        style={{ width: `${titleWidth}px` }}
                    />
                    <span ref={spanRef} className="invisible absolute whitespace-nowrap">{taskUpdate.title}</span>
                    <StatusMarker status={taskUpdate.status} onChange={handleChange} width={`${statusWidth}px`} />
                    <span ref={statusRef} className="invisible absolute whitespace-nowrap">{taskUpdate.status}</span>
                </div>
                <RiSaveLine className="text-primary text-xl cursor-pointer" onClick={handleSaveClick} />
            </div>
            <textarea
                name="description"
                onChange={handleDescriptionChange}
                value={taskUpdate.description || ''}
                placeholder={'Description...'}
                className='w-full my-1 bg-background text-text'
            />
            <div className="flex w-full justify-end gap-4 items-center">
                <TypeMarker type={taskUpdate.type} onChange={handleChange} />
                <div className="flex items-center">
                    <button onClick={() => handlePointsChange(true)} className="bg-background text-text px-2">
                        <FaCaretUp className="text-xl text-primary"/>
                    </button>
                    <p className={"bg-background text-center w-[20px] min-w-[20px]" + (taskUpdate.points !== -1 ? 'text-text' : 'text-gray-500')}>
                        {taskUpdate.points}
                    </p>
                    <button onClick={() => handlePointsChange(false)} className="bg-background text-text px-2">
                        <FaCaretDown className="text-xl text-primary"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditableTaskItem;
