/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {storiesOf} from '@kadira/storybook';
import {TextEdit}  from '../TextEdit'

declare var module: any;

interface IWrap {
  value: any
}

class Wrap extends React.Component<void, IWrap> {
  constructor(props) {
    super(props)
    this.state = {
      value: 'qwe'
    }
  }

  render() {
    return (
      <TextEdit
        value={this.state.value}
        onChange={(e) => this.setState({value: e.target.value})}
      />
    )
  }

}

storiesOf('TextEdit', module)
  .add('Default', () => (
    <Wrap/>
  ));