import { useContext } from 'react'
import { useTaskOnForm } from '../context/TaskOnFormContext'
import type { FormContextInterface, Task, TaskWithoutBoardId } from '../types'
import { CloseRing, DoneRound, Time } from './Icons'
import { FormContext } from '../context/FormContext'
import { FormMode } from '../enums'

const CLASS_NAME_TASK: Record<Task['status'], string> = {
  1: 'inprogress',
  2: 'completed',
  3: 'wontdoit'
}

const TASK_ICON = {
  1: <Time />,
  2: <DoneRound />,
  3: <CloseRing />
}

const Task = ({ id, title, description, icon, status }: TaskWithoutBoardId) => {
  const { setTaskOnForm, taskOnFormRef } = useTaskOnForm()
  const { setIsFormVisible, formModeRef } = useContext(FormContext) as FormContextInterface

  const handleClick = () => {
    setIsFormVisible(true)
    formModeRef.current = FormMode.Update
    const task = { id, title, description, icon, status }
    setTaskOnForm(task)
    taskOnFormRef.current = task
  }

  const taskClassName = `task task--${CLASS_NAME_TASK[status as Task['status']]}`
  const iconClassName = `icon-wrapper icon-wrapper--${CLASS_NAME_TASK[status as Task['status']]}`

  return (
    <li
      className={taskClassName}
      onClick={handleClick}
      data-id={id}
    >
      <span className="radio-button-icon">
        {icon && <img src={icon} alt="" />}
      </span>
      <div className="task-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className={iconClassName}>{TASK_ICON[status as Task['status']]}</span>
    </li>
  )
}

export default Task