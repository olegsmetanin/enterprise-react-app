import { configure } from '@kadira/storybook'
import '../src/styles/default.less'

function loadStories() {
    require('../src/Components/Generic/Button/__stories__/index.tsx')
    require('../src/Components/Generic/TextEdit/__stories__/index.tsx')
}

configure(loadStories, module);