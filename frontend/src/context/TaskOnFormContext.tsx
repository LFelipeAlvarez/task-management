import React, { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState } from "react";
import { TaskWithoutBoardId } from "../types";
import { initialTask } from "../consts";

interface TaskOnFormContextInterface {
  taskOnForm: TaskWithoutBoardId | null;
  setTaskOnForm: Dispatch<SetStateAction<TaskWithoutBoardId | null>>;
  taskOnFormRef: MutableRefObject<TaskWithoutBoardId | null>
}

const TaskOnFormContext = createContext<TaskOnFormContextInterface | null>(null)

export const useTaskOnForm = () => {
  const taskOnFormContext = useContext(TaskOnFormContext)

  if (!taskOnFormContext) {
    throw new Error(
      "useTaskOnForm has to be used within <TaskOnFormProvider>"
    );
  }

  return taskOnFormContext;
}

export const TaskOnFormProvider = ({ children }: { children: React.ReactNode }) => {

  const [taskOnForm, setTaskOnForm] = useState<TaskWithoutBoardId | null>(initialTask)
  const taskOnFormRef = useRef(null);
  const contextValue: TaskOnFormContextInterface = { taskOnForm, setTaskOnForm, taskOnFormRef };

  return (
    <TaskOnFormContext.Provider value={contextValue}>
      {children}
    </TaskOnFormContext.Provider>
  )


}

