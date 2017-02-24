import * as React from 'react'
/* tslint:disable */
import * as ReactRedux from 'react-redux'
/* tslint:enable */
import {connect} from 'react-redux'
import {HTTPClient} from 'Core/HTTPClient'

import {Router, IndexRoute, Route} from 'react-router'

import {Layout} from 'Application/Layout'
import {HomePage} from 'Application/Home/HomePage'

import {
  ISettings,
  ISettingsActions
} from './Application/Settings/API'
import {SettingsActions} from 'Application/Settings/SettingsActions'
import {SettingsService} from 'Application/Settings/SettingsService'

export interface IBaseApplicationOwnProps {
  appContext: any
}

export interface IBaseApplicationProps {
  settings: ISettings
  actions: ISettingsActions
}

export interface IApplicationState {
  location: any
}

export class BaseApplication extends React.Component<IBaseApplicationOwnProps & IBaseApplicationProps, IApplicationState> {

  counter: number = 0
  unlisten: any
  // location: any

  constructor(props) {
    super(props)
    this.state = {
      location: '/'
    }
  }

  componentDidMount() {
    // this.location = history.location
    // let history = this.props.appContext.history
    // this.unlisten = history.listen((location, action) => {
    //   // console.log(action, location.pathname, location.state)
    //   this.setState({location: location.pathname})
    // })
    if (!this.props.settings.me) {
      this.props.actions.getSettings()
    }
  }

  componentWillUnmount() {
    // this.unlisten()
  }

  render() {
    let history = this.props.appContext.history
    let {settings} = this.props



    return settings.config ? (
      <Router key={this.counter} history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute
            component={HomePage}/>
        </Route>
      </Router>
    ) : (
      <div>
        Loading
      </div>
    )
  }
}

const mS2P = (state) => {
  return {
    settings: state.settings
  }
}

const mD2P = (dispatch) => {
  let actions = new SettingsActions(new SettingsService(new HTTPClient()), dispatch)
  return {
    actions
  }
}

export const Application = connect<IBaseApplicationOwnProps>(mS2P, mD2P)(BaseApplication)
