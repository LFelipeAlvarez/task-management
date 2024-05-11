import { Task } from '../types'
import { useParams } from 'react-router-dom'
import { FormMode } from '../enums'
import { CloseRing2, DoneRound2, Trash } from './Icons'
import { useTaskOnForm } from '../context/TaskOnFormContext'
import Modal from './Modal'
import useForm from '../hooks/useForm'
import TaskStatusGroup from './TaskStatusGroup'
import TaskIconsGroup from './TaskIconsGroup'
import TaskTitleInput from './TaskTitleInput'
import TaskDescriptionInput from './TaskDescriptionInput'

const TaskForm = () => {
  const { id: boardId } = useParams()
  const { taskOnForm, taskOnFormRef } = useTaskOnForm()
  const {
    formModeRef,
    handleSubmit,
    handleClickDeleteButton,
    isFormVisible,
    formActionLoader,
    closeForm
  } = useForm()

  const hasAnyTaskValueChanged = () => {
    if (!taskOnForm) return false;
    return (
      taskOnForm.title !== taskOnFormRef.current?.title ||
      taskOnForm.description !== taskOnFormRef.current?.description ||
      taskOnForm.status !== taskOnFormRef.current?.status ||
      taskOnForm.icon !== taskOnFormRef.current?.icon
    );
  };
  const formClassName = isFormVisible ? 'task-form task-form--visible' : 'task-form'

  return (
    <Modal isFormVisible={isFormVisible}>

      <form action="" className={formClassName} onSubmit={e => handleSubmit(e, boardId as Task['board_id'])}>
        {
          !formActionLoader &&
          <button
            className='close-button'
            type='button'
            onClick={closeForm}>
            <CloseRing2 />
          </button>
        }
        <h2>Task details</h2>
        <TaskTitleInput />
        <TaskDescriptionInput />
        <TaskIconsGroup />
        <TaskStatusGroup />
        <div className="button-group">
          {
            formModeRef.current === FormMode.Update &&
            <button
              onClick={() => taskOnForm?.id && handleClickDeleteButton(taskOnForm?.id)}
              type='button'
              className="button"
              disabled={formActionLoader}
            >
              Delete <Trash />
            </button>
          }
          {
            formActionLoader
              ? <button className="button button--blue" disabled={formActionLoader}>
                Save
                <DoneRound2 />
              </button>
              : <button className="button button--blue" disabled={!hasAnyTaskValueChanged()} /* disabled={formModeRef.current === FormMode.Update && !hasAnyTaskValueChanged} */ >
                Save
                <DoneRound2 />
              </button>
          }
        </div>

      </form >
    </Modal>

  )
}

export default TaskForm