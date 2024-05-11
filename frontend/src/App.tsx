import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import InitialLoader from './components/InitialLoader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board/:id" Component={TasksPage} />
        <Route path="/" Component={InitialLoader} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
