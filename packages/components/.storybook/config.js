import { configure } from '@kadira/storybook'
import '../src/styles/styles.less'

function loadStories() {
    require('../src/components/__stories__/index.story.tsx')
}

configure(loadStories, module);