/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import * as renderer from 'react-test-renderer'

interface ButtonProps { };

export class Button extends React.Component<ButtonProps, void>{
  render() {
    return (
      <button
        className="btn btn-default"
        type="submit"
      >
        {this.props.children}
      </button>
    );
  }
}

it('renders correctly', () => {
    const tree = renderer.create(
        <Button>
            qwe
        </Button>
    ).toJSON()
    expect(tree).toMatchSnapshot()
})