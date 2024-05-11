import React, { useContext, useState } from 'react'
import { FormContextInterface, Task } from '../types';
import { FormContext } from '../context/FormContext';
import { useTaskOnForm } from '../context/TaskOnFormContext';
import { FormMode } from '../enums';
import useTask from './useTask';
import { initialTask } from '../consts';

const useForm = () => {

  const { isFormVisible, setIsFormVisible, formModeRef } = useContext(FormContext) as FormContextInterface
  const { addTask, updateTask, deleteTask } = useTask()
  const { taskOnForm, setTaskOnForm } = useTaskOnForm()
  const [formActionLoader, setFormActionLoader] = useState(false)

  const closeForm = () => {
    setTaskOnForm(initialTask)
    setIsFormVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, boardId: Task['board_id']) => {
    e.preventDefault();
    try {
      setFormActionLoader(true);
      if (formModeRef.current === FormMode.Create) {
        if (boardId && taskOnForm?.title.trim()) await addTask({ board_id: boardId, ...taskOnForm });

      } else {

        if (taskOnForm?.id && taskOnForm?.title.trim()) await updateTask(taskOnForm);

      }

      closeForm()

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error handling form submission:', error);
        alert(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
      }
    } finally {
      setFormActionLoader(false);
      // closeForm()
    }
  }

  const handleClickDeleteButton = async (taskId: Task['id']) => {
    if (confirm('Are you sure ?')) {

      try {
        setFormActionLoader(true)
        await deleteTask(taskId)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error deleting task: ', error);
          alert(`Error: ${error.message}`);
        } else {
          console.error('An unknown error occurred:', error);
        }
      } finally {
        closeForm()
        setFormActionLoader(false)
      }
    }
  }

  return {
    handleSubmit,
    closeForm,
    handleClickDeleteButton,
    isFormVisible,
    formActionLoader,
    formModeRef,
  }
}

export default useForm