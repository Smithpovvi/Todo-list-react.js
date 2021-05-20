import React from 'react'
import {Story, Meta} from '@storybook/react'
import {AppWithRedux} from "./AppWithRedux"
import {ReduxStoreProviderDecorator} from "../../Stories/Decorators/ReduxStoreProviderDecorator"


export default {
    title: 'Example/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = (args) => <AppWithRedux/>

export const AppWithReduxExample = Template.bind({})

