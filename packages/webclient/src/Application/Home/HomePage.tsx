import * as React from 'react'
/* tslint:disable */
import * as ReactRedux from 'react-redux'
/* tslint:enable */
import {connect} from 'react-redux'
import {Button} from 'WebComponents'

import {ISettings} from 'Application/Settings/API';
// import {BlogPostList} from 'Application/BlogPosts/Components/BlogPostList'
import {BlogPostTable} from 'Application/BlogPosts/Components/BlogPostTable'

export interface IBaseHomePageProps {
  settings: ISettings
}

//         <BlogPostList cid="asd" query={null}/>
export class BaseHomePage extends React.Component<IBaseHomePageProps, void> {
  render() {
    return (
      <div>
        settings:{JSON.stringify(this.props.settings)}
        <a href="/login/facebook">FB</a>
        <BlogPostTable cid="asd" query={{ids: ['1']}}/>
        <BlogPostTable cid="qwe" query={{ids: ['2']}}/>
      </div>
    )
  }
}

const mS2P = (state) => {
  return {
    settings: state.settings
  }
}

export const HomePage = connect<void>(mS2P)(BaseHomePage)
