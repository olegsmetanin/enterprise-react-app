import * as React from 'react'

export interface ILayoutProps {

}
export class Layout extends React.Component<ILayoutProps, void> {
  render() {
    return (
      <div>
        <div>Layout</div>
        {this.props.children}
      </div>
    )
  }
}
