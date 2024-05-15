import Button from "@src/components/button";
import { useState } from "react";

const TaskAdd = () => {
    const [showInput, setShowInput] = useState(false);

    return (
        <div className="flex flex-row justify-end w-full">
           {showInput && <input className="w-full p-3 rounded-xl bg-input text-text" placeholder="Add a task..."/>}
           <Button text="Add" onClick={() => setShowInput(!showInput)} type={showInput ? "primary" : "skeleton"}/> 
        </div>
    )
}

export default TaskAdd;