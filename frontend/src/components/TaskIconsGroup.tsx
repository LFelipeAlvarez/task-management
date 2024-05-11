import { radioButtonsForIcons } from "../consts"
import { useTaskOnForm } from "../context/TaskOnFormContext"
import { TaskWithoutBoardId } from "../types"

const TaskIconsGroup = () => {
  const { taskOnForm, setTaskOnForm } = useTaskOnForm()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskOnForm({ ...taskOnForm, icon: e.target.value } as TaskWithoutBoardId)
  }

  return (
    <fieldset className="group-radio-flex">
      <legend>Icon</legend>
      {radioButtonsForIcons.map(radioButton =>
        <p key={radioButton.id}>
          <input
            type="radio"
            name="icon"
            id={radioButton.id}
            value={radioButton.value}
            checked={taskOnForm?.icon === radioButton.value}
            onChange={handleInputChange} />
          <label htmlFor={radioButton.id} className="radio-button-icon">
            <img src={`/${radioButton.iconName}`} alt={radioButton.altImg} />
          </label>
        </p>
      )}
    </fieldset>
  )
}

export default TaskIconsGroup