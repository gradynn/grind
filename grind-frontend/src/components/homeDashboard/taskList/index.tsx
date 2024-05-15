import { useContext } from "react";

import { UserContext } from "@src/context/UserContext";
import TaskAdd from "@src/components/homeDashboard/taskList/taskAdd";
import TaskItem from '@src/components/homeDashboard/taskList/taskItem';
import { Task } from "@src/models/userData";

const TaskList = () => {
    const { userData } = useContext(UserContext);
    return (
        <div className="h-[95%] bg-background-2 w-full lg:w-1/3 rounded-3xl p-5">
            <TaskAdd />
           <div className="w-full drop-shadow-xl my-2"></div>
            {userData ? userData.tasks.map((task: Task) => {
                return (
                    <TaskItem task={task} />
                )
            }) : null}
        </div>
    )
}

export default TaskList;