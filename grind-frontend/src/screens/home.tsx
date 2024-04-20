import TaskList from "@src/components/TaskList";

const Home = () => {
    return (
        <div className="h-screen">
            <div className="bg-indigo-500 h-[5vh]">menu</div>
            <div className="flex flex-row flex-grow">
                <div className="w-[30%] bg-blue-500">
                    <TaskList />
                </div>
                <div className="w-[70%] bg-green-500">calendar</div>
            </div>
        </div>
    )
}

export default Home;