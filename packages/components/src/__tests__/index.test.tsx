/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import * as renderer from 'react-test-renderer'

it('renders correctly', () => {
    const tree = renderer.create(
        <div className = "qwe"/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
})