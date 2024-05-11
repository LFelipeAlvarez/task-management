import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../utils';
import { createBoard } from '../helpers/manageDataFromApi';

const InitialLoader = () => {
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const boardIdFromCookie = getCookie("taskManagementBoardId");
        if (boardIdFromCookie) navigate(`/board/${boardIdFromCookie}`)
        else {
          const newBoardId = await createBoard();
          if (newBoardId) setCookie("taskManagementBoardId", newBoardId);
          navigate(`/board/${newBoardId}`)
        }
      })()
    })
  
    return null
}

export default InitialLoader