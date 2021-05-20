import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import {AppWithRedux} from './Components/AppWithRedux/AppWithRedux'
import {store} from './state/store'
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root'))


serviceWorker.unregister()
