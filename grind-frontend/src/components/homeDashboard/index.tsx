import TaskList from "./taskList";

const HomeDashboard = () => {
    return (
        <div className='flex-1 flex-row w-full items-center justify-start overflow-y-auto'>
            <TaskList />
        </div>
    )
}

export default HomeDashboard;