export interface TaskUpdate {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    type: TaskType;
    points: number;
    status: TaskStatus;
}

enum TaskType {
    "STORY",
    "TASK"
}

enum TaskStatus {
    "TODO",
    "IN_PROGRESS",
    "DONE"
}