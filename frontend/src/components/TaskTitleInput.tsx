import { TaskWithoutBoardId } from '../types'
import { useTaskOnForm } from '../context/TaskOnFormContext'

const TaskTitleInput = () => {

  const { taskOnForm, setTaskOnForm } = useTaskOnForm()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setTaskOnForm({ ...taskOnForm, title } as TaskWithoutBoardId)
  }

  return (
    <div>
      <label htmlFor="title">Task name</label>
      <input
        pattern="^(?!\s*$).{1,100}$"
        required
        placeholder="Go to the gym..."
        type="text"
        name="title"
        id="title"
        value={taskOnForm?.title || ''}
        onChange={handleInputChange} />
    </div>
  )
}

export default TaskTitleInput