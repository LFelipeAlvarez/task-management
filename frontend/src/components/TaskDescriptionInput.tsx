import React from 'react'
import { TaskWithoutBoardId } from '../types'
import { useTaskOnForm } from '../context/TaskOnFormContext'

const TaskDescriptionInput = () => {
  const { taskOnForm, setTaskOnForm } = useTaskOnForm()
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskOnForm({ ...taskOnForm, description: e.target.value } as TaskWithoutBoardId)
  }
  return (
    <div>
      <label htmlFor="description">Description</label>
      <textarea
        rows={5}
        maxLength={150}
        placeholder="Enter a short description"
        name="description"
        id="description"
        value={taskOnForm?.description}
        onChange={handleInputChange}></textarea>
    </div>
  )
}

export default TaskDescriptionInput