/* tslint:disable */
import * as React from "react";
/* tslint:enable */
import * as ReactDOM from "react-dom";
// import * as components from 'components'
// import {Button} from 'components'
import {Button} from 'enterprise-react-app-webcomponents'

//import from './styles/default.less'
require('./styles/default.less')

// let Button = components.Button
ReactDOM.render(<div>QWE
    <Button
      onClick={() => console.log('qwe')}
    >
      Button
    </Button>
    <a href="/login/facebook">FB</a>
</div>, document.getElementById('app'))