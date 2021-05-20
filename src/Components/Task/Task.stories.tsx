import React from 'react'
import {Story, Meta} from '@storybook/react'
import {action} from "@storybook/addon-actions"
import {Task, TaskPropsType} from "./Task"


export default {
    title: 'Example/Task',
    component: Task,
} as Meta

const Template: Story<TaskPropsType> = (args) => <Task {...args} />

const changeTaskStatus = action('Status changed inside Task')
const changeTaskTitle = action('Title changed inside Task')
const removeTask = action('Remove Button inside Task clicked')

const baseArgs = {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask,
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
}
export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
    todolistId: 'todolistId1'
}

