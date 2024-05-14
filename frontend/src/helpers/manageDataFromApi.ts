import { API_URL } from "../consts";
import { Task, TaskWithoutBoardId, TaskWithoutId } from "../types";


export const createBoard = async (): Promise<Task['board_id']> => {
    const resp = await fetch(`${API_URL}board`, {
        method: 'POST'
    });

    if (!resp.ok) throw new Error(`Failed to create board: ${resp.statusText}`);
    const newBoard = await resp.json();
    return newBoard.id
}

export const getTasksByBoardId = async (boardId: string): Promise<Task[]> => {
    const resp = await fetch(`${API_URL}tasks?board=${boardId}`);
    if (!resp.ok) throw new Error(`Failed to get tasks: ${resp.statusText}`);
    const tasks = await resp.json();
    return tasks
}


export const existsThisBoard = async (boardId: string) => {
    const resp = await fetch(`${API_URL}board/${boardId}`);
    if (!resp.ok) throw new Error(`Failed to get board: ${resp.statusText}`);
    const [board] = await resp.json();
    return Boolean(board)
}

export const createTask = async (task: TaskWithoutId): Promise<Task> => {
    const body = JSON.stringify(task)
    const resp = await fetch(`${API_URL}tasks`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body
        }
    );
    if (!resp.ok) {
        const { error } = await resp.json()
        throw new Error(`Failed to create task: ${error[0].message}`)
    }
    const newTaskAdded = await resp.json();
    return newTaskAdded
}

export const updateTaskHelper = async (task: TaskWithoutBoardId): Promise<Task> => {
    const body = JSON.stringify(task)
    const resp = await fetch(`${API_URL}tasks/${task.id}`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body
        }
    );

    if (!resp.ok) {
        const { error } = await resp.json()
        throw new Error(`Failed to update task: ${error[0].message}`)
    }
    const updatedTask = await resp.json();
    return updatedTask
}

export const deleteTaskHelper = async (taskId: Task['id']) => {
    await fetch(`${API_URL}tasks/${taskId}`, { method: 'DELETE' });

}
