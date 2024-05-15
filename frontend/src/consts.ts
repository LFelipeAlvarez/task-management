import { Task, TaskWithoutBoardId } from "./types"

export const DOMAIN = import.meta.env.VITE_DOMAIN ?? 'http://localhost:5173/'
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/'

export const initialTask: TaskWithoutBoardId = {
  id: 0,
  title: '',
  description: '',
  icon: `${DOMAIN}coffee.svg`,
  status: 1
}

export const radioButtonsForIcons = [
  {
    id: 'icon1',
    iconName: 'coffee.svg',
    altImg: 'coffee icon',
    value: DOMAIN + 'coffee.svg'
  },
  {
    id: 'icon2',
    iconName: 'message.svg',
    altImg: 'message icon',
    value: DOMAIN + 'message.svg'
  },
  {
    id: 'icon3',
    iconName: 'person-with-laptop-male.svg',
    altImg: 'person-with-laptop-male icon',
    value: DOMAIN + 'person-with-laptop-male.svg'
  },
  {
    id: 'icon4',
    iconName: 'weightlifting.svg',
    altImg: 'weightlifting icon',
    value: DOMAIN + 'weightlifting.svg'
  },
  {
    id: 'icon5',
    iconName: 'alarm-clock.svg',
    altImg: 'alarm clock icon',
    value: DOMAIN + 'alarm-clock.svg'
  },
  {
    id: 'icon6',
    iconName: 'books.svg',
    altImg: 'books icon',
    value: DOMAIN + 'books.svg'
  }
]

export const initialTasks: Task[] = [
  {
    id: -2,
    title: 'Task in Progress',
    description: '',
    status: 1,
    icon: DOMAIN + 'alarm-clock.svg',
    board_id: ''
  },
  {
    id: -1,
    title: 'Task Completed',
    description: '',
    status: 2,
    icon: DOMAIN + 'weightlifting.svg',
    board_id: ''
  },
  {
    id: 0,
    title: 'Task Won\'t do',
    description: '',
    status: 3,
    icon: DOMAIN + 'coffee.svg',
    board_id: ''
  },
]