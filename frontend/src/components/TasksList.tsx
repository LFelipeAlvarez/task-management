import './task-list.css'
import Task from './Task'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { FormContext } from '../context/FormContext'
import { FormMode } from '../enums'
import { AddRound } from './Icons'
import { FormContextInterface } from '../types'
import useTask from '../hooks/useTask'

const TasksList = () => {
	const { id: boardId } = useParams()
	const { listTasks, tasks } = useTask()
	const { setIsFormVisible, formModeRef } = useContext(FormContext) as FormContextInterface

	useEffect(() => {
		(async () => {
			try {
				if (boardId) await listTasks(boardId)
			} catch (error) {
				if (error instanceof Error) {
					console.error('Error loading board:', error);
					alert(`Error loading board: ${error.message}`);
				}
			}

		})()
	}, [])

	const hancleClickCreate = () => {
		formModeRef.current = FormMode.Create
		setIsFormVisible(true)
	}


	return (
		<>
			<ul className='tasks-list'>
				{
					tasks.map(task => <Task key={task.id} {...task} />)
				}
			</ul>
			<button className="task" onClick={hancleClickCreate}>
				<span className="radio-button-icon radio-button-icon--add">
					<AddRound />
				</span>
				<h3>Add New Task</h3>
			</button>
		</>
	)
}

export default TasksList