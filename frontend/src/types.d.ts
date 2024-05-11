
export interface Task {
    id: number
    title: string
    description?: string
    status: 1 | 2 | 3
    board_id: string
    icon?: string
}

export type TaskWithoutId = Omit<Task, 'id'>
export type TaskWithoutBoardId = Omit<Task, 'board_id'>
// export interface FormTask extends Omit<Task, 'board_id' | 'id'> {
//     id?: number
//     board_id?: string
// }

export interface FormContextInterface {
    isFormVisible: boolean;
    setIsFormVisible: Dispatch<SetStateAction<boolean>>;
    formModeRef: MutableRefObject<FormMode>
}