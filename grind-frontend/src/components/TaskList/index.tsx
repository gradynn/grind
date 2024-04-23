import { UseState } from 'react';
import Task from '@src/models/task';

const TaskList = () => {
   const [activeTasks, setActiveTasks] = useState<Task[]>([]); 
    
    return (
        <div>
        <h1>Task List</h1>
        </div>
    );
}

export default TaskList;