import * as React from 'react'

import styled from "styled-components"

export interface ButtonProps {
  onClick?: any
  className?: any
};

export class Button extends React.Component<ButtonProps, void>{
  render() {
    return (
      <button
        className={"btn btn-default " + this.props.className}
        type="submit"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export const StyledButton = styled(Button)`
  color: palevioletred;
`;