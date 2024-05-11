import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { Task } from "../types";

interface TasksContextInterface {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const TasksContext = createContext<TasksContextInterface | null>(null)

export const useTasks = () => {
  const tasksContext = useContext(TasksContext)

  if (!tasksContext) {
    throw new Error(
      "useTasks has to be used within <TasksProvider>"
    );
  }

  return tasksContext;
}

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {

  const [tasks, setTasks] = useState<Task[]>([])

  const contextValue: TasksContextInterface = { tasks, setTasks };

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  )


}

