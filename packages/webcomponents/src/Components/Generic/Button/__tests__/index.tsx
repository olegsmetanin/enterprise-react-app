/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import * as renderer from 'react-test-renderer'

import {Button}  from '../Button'

it('renders correctly', () => {
    const tree = renderer.create(
        <Button>
            qwe
        </Button>
    ).toJSON()
    expect(tree).toMatchSnapshot()
})