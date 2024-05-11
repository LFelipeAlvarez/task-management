import './task-page.css'
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { existsThisBoard } from "../helpers/manageDataFromApi";
import '../components/task-form.css'
import TasksList from "../components/TasksList";
import TaskForm from '../components/TaskForm';
import { TaskOnFormProvider } from '../context/TaskOnFormContext';
import { TasksProvider } from '../context/TasksContext';
import { FormProvider } from '../context/FormContext';
import { Edit, Logo } from '../components/Icons';


const TasksPage = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams()

  useEffect(() => {

    (async () => {
      if (boardId) {
        try {
          if (!await existsThisBoard(boardId)) {
            return navigate('/404')
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error loading board:', error);
            alert(`Error loading board: ${error.message}`);
          }
        }
      }
    })()

  }, [])

  return (
    <TasksProvider>
      <TaskOnFormProvider>
        <FormProvider>
          <main>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <Logo />
                <span style={{ flex: '1 1' }}></span>
              </span>
              <span>
                <h1>My task board</h1>
                <h2>Tasks to keep organised</h2>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <Edit />
                <span style={{ flex: '1 1' }}></span>
              </span>
            </div>
            <TasksList />
            <TaskForm />
          </main>
        </FormProvider>
      </TaskOnFormProvider>
    </TasksProvider>

  )
}

export default TasksPage