/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {storiesOf, action} from '@kadira/storybook';
import {Button, StyledButton}  from '../Button'

declare var module: any;

storiesOf('Button', module)
  .add('Default', () => (
    <Button
      onClick={action('click')}
    >
      Button
    </Button>
  ))
  .add('Styled', () => (
    <StyledButton
      onClick={action('click')}
    >
      StyledButton
    </StyledButton>
  ));