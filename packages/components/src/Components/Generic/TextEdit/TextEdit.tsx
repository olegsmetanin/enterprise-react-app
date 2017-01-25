import * as React from 'react'

export interface TextEditProps {
  value: any
  onChange?: (e) => void
};

export class TextEdit extends React.Component<TextEditProps, void>{
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={(e) => this.props.onChange(e)}
      />
    );
  }
}