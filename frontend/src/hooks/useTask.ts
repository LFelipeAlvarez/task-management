import { createTask, deleteTaskHelper, getTasksByBoardId, updateTaskHelper } from '../helpers/manageDataFromApi';
import { useTasks } from '../context/TasksContext';
import { Task, TaskWithoutBoardId, TaskWithoutId } from '../types';
import { DOMAIN } from '../consts';

const useTask = () => {

  const { tasks, setTasks } = useTasks()

  const listTasks = async (boardId: Task['board_id']) => {
    const tasksFromRequest = await getTasksByBoardId(boardId);
    // if (tasksFromRequest.length === 0) return setTasks(initialTasks)
    setTasks(tasksFromRequest)
  }

  const addTask = async (task: TaskWithoutId) => {
    if (task.board_id) {
      const taskToAdd: TaskWithoutId = {
        title: task.title.replace(/\s{2,}/g, ' ').trim(),
        description: task.description?.replace(/\s{2,}/g, ' ').trim(),
        status: task.status ?? 1,
        icon: task.icon ?? `${DOMAIN}coffee.svg`,
        board_id: task.board_id
      }
      const newTaskCreated = await createTask(taskToAdd)
      setTasks((prevTasks) => [...prevTasks, newTaskCreated]);
    }
  }

  const updateTask = async (task: TaskWithoutBoardId) => {
    const taskId = task?.id
    if (taskId) {
      const taskToUpdate: TaskWithoutBoardId = {
        id: taskId,
        title: task.title.replace(/\s{2,}/g, ' ').trim(),
        description: task.description?.replace(/\s{2,}/g, ' ').trim(),
        status: task.status,
        icon: task.icon,
      }
      const taskUpdated = await updateTaskHelper(taskToUpdate)
      const updatedTasks = tasks.map(task => task.id === taskId ? taskUpdated : task)
      setTasks(updatedTasks)
    }
  }

  const deleteTask = async (taskId: Task['id']) => {
    await deleteTaskHelper(taskId)
    const filteredTasks = tasks.filter(task => task.id !== taskId)
    setTasks(filteredTasks)
  }

  return {
    listTasks,
    addTask,
    updateTask,
    deleteTask,
    tasks
  }

}

export default useTask