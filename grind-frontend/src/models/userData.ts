export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    type: "STORY" | "TASK";
    points: number;
    status: "TODO" | "IN_PROGRESS" | "DONE";
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    tasks: Task[];
}