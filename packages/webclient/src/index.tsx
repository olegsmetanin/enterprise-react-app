/* tslint:disable */
import * as React from "react";
/* tslint:enable */
import * as ReactDOM from 'react-dom'
import {createHashHistory} from 'history'
import {browserHistory} from 'react-router'
import {applyMiddleware, compose, createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {EventBus} from 'Core/EventBus'

import {Application} from 'Application'
import {settingsReducer} from 'Application/Settings/settingsReducer'
import {entitiesReducer} from 'Application/Entities/entitiesReducer'

import {blogPostsListReducer} from 'Application/BlogPosts/blogPostsListReducer'
import {genericTablesReducer} from 'Core/Components/GenericTable/genericTablesReducer'

require('./styles/default.less')

window['app'] = ({el, initialState}) => {

  let eventBus = new EventBus()

  let history = browserHistory

  const middleware = [thunk]
  let composeEnhancers = compose

  const store = createStore(
    combineReducers({
      settings: settingsReducer,
      entities: entitiesReducer,
      blogPostList: blogPostsListReducer,
      tables: genericTablesReducer
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
  store['asyncReducers'] = {}

  let appContext = {
    eventBus,
    history
  }

  let application = (
    <Provider store={store}>
      <Application appContext={appContext}/>
    </Provider>
  )

  ReactDOM.render(application, el)


}
