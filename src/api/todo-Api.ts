import axios from "axios"

type CommonTodoType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "d99d4953-dcf7-4e1d-821f-2ba7a1f58bc9",
    },
})

export const todoAPI = {
    getTodo() {
        return instance.get<Array<TodoType>>("todo-lists")
    },
    createTodo(title: string) {
        return instance.post<CommonTodoType<{ item: TodoType }>>("todo-lists", { title })
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<CommonTodoType<{}>>(`todo-lists/${todolistId}`, { title })
    },
    deleteTodo(todolistId: string) {
        const promise = instance.delete<CommonTodoType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },
}
