import Button from "@src/components/button";
import { useState } from "react";

import { useAuth } from "@src/utils/useAuth";
import { addTask } from "@src/services/backend.service";

const TaskAdd = () => {
    const [showInput, setShowInput] = useState(false);
    const [title, setTitle] = useState('');
    const { token } = useAuth();

    const handleClick = async () => {
        if (!token) {
            alert('You need to be signed in to add a task');
            return;
        }
        if (showInput) {
            await addTask(token, title);
            setTitle('');
            window.location.reload();
        }
        setShowInput(!showInput);
    }

    return (
        <div className="flex flex-row justify-end w-full">
           {showInput && <input className="w-full p-3 rounded-xl bg-input text-text" placeholder="Add a task..." value={title} onChange={e => setTitle(e.target.value)}/>}
           <Button text="Add" onClick={handleClick} type={showInput ? "primary" : "skeleton"}/> 
        </div>
    )
}

export default TaskAdd;