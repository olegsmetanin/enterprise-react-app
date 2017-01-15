/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import * as renderer from 'react-test-renderer'

import {TextEdit}  from '../TextEdit'

it('renders correctly', () => {
    const tree = renderer.create(
        <TextEdit value="qwe"/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
})