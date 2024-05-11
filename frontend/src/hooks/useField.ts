import { useTaskOnForm } from "../context/TaskOnFormContext"

import React from 'react'
import { TaskWithoutBoardId } from "../types"

const useField = ({ field }: { field: string }) => {
  const { taskOnForm, setTaskOnForm } = useTaskOnForm()
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value: string | number = e.target.value
    if (!isNaN(parseInt(value))) value = parseInt(value)
    setTaskOnForm({ ...taskOnForm, [field]: value } as TaskWithoutBoardId)
  }


  return { onChange, value: taskOnForm[field], taskOnForm }
}

export default useField

