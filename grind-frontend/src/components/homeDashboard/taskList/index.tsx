import { useContext, useState } from "react";

import { UserContext } from "@src/context/UserContext";
import TaskAdd from "@src/components/homeDashboard/taskList/taskAdd";
import TaskItem from '@src/components/homeDashboard/taskList/taskItem';
import { Task } from "@src/models/userData";
import EditableTaskItem from "./editableTaskItem";
import Dropdown from "@src/components/dropdown";

const statuses = [
    "TODO",
    "IN_PROGRESS",
    "DONE"
]

const TaskList = () => {
    const { userData } = useContext(UserContext);

    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [editing, setEditing] = useState<string | null>(null);

    return (
        <div className="bg-background-2 w-full lg:w-1/3 rounded-2xl p-2 m-2 h-full flex flex-col">
            <TaskAdd />
            <div className="w-full overflow-x-scroll">
                <Dropdown options={statuses} callback={setStatusFilter}/>
            </div>
           <div className="flex flex-col w-full overflow-y-auto mt-2" style={{ flexGrow: 1 }}>
                {userData ? userData.tasks.filter((task: Task) => {
                    return !statusFilter || task.status == statusFilter
                }).map((task: Task) => {
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
        </div>
    )
}

export default TaskList;