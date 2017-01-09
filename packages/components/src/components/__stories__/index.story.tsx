/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {storiesOf, action} from '@kadira/storybook';

declare var module: any;

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <button
      className="btn btn-default"
      type="submit"
      onClick={action('click')}
    >
      Button
    </button>
  ));