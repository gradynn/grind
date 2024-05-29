import { useContext, useState } from "react";

import { UserContext } from "@src/context/UserContext";
import TaskAdd from "@src/components/homeDashboard/taskList/taskAdd";
import TaskItem from '@src/components/homeDashboard/taskList/taskItem';
import { Task } from "@src/models/userData";
import EditableTaskItem from "./editableTaskItem";

const TaskList = () => {
    const { userData } = useContext(UserContext);
    const [editing, setEditing] = useState<string | null>(null);

    return (
        <div className="h-[95%] bg-background-2 w-full lg:w-1/3 rounded-3xl p-5">
            <TaskAdd />
           <div className="flex flex-col w-full drop-shadow-xl my-2"></div>
            {userData ? userData.tasks.map((task: Task) => {
                if (task.id == editing) {
                    return (
                        <EditableTaskItem task={task} setEditing={setEditing}/>
                    )
                } else {
                    return (
                        <TaskItem task={task} setEditing={setEditing}/>
                    )
                }
            }) : null}
        </div>
    )
}

export default TaskList;