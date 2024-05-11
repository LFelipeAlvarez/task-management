import { CloseRing, DoneRound, Time } from './Icons';
import { TaskWithoutBoardId } from '../types';
import { useTaskOnForm } from '../context/TaskOnFormContext';


const radioButtonsForStatus = [
  {
    id: 'inprogress',
    value: 1,
    label: 'In Progress',
    icon: <Time />,
    iconWrapperClass: 'icon-wrapper icon-wrapper--yellow'
  },
  {
    id: 'completed',
    value: 2,
    label: 'Completed',
    icon: <DoneRound />,
    iconWrapperClass: 'icon-wrapper icon-wrapper--green'
  },
  {
    id: 'wontdoit',
    value: 3,
    label: 'Won\'t do',
    icon: <CloseRing />,
    iconWrapperClass: 'icon-wrapper icon-wrapper--red'
  }
];

const TaskStatusGroup = () => {
  const { taskOnForm, setTaskOnForm } = useTaskOnForm()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskOnForm({ ...taskOnForm, status: +e.target.value } as TaskWithoutBoardId)
  }

  return (
    <fieldset className="group-radio-flex">
      <legend>Status</legend>
      {
        radioButtonsForStatus.map(radioButton =>
          <p key={radioButton.id}>
            <input
              type="radio"
              name="status"
              id={radioButton.id}
              value={radioButton.value}
              checked={taskOnForm?.status === radioButton.value}
              onChange={handleInputChange}
            />
            <label className="status-item" htmlFor={radioButton.id}>
              <span className={`icon-wrapper ${radioButton.iconWrapperClass}`}>
                {radioButton.icon}
              </span>
              {radioButton.label}
            </label>
          </p>
        )
      }
    </fieldset>
  )
}

export default TaskStatusGroup