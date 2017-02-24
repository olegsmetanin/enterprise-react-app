import * as React from 'react'
/* tslint:disable */
import * as ReactRedux from 'react-redux'
/* tslint:enable */
import {connect} from 'react-redux'
import {Button} from 'WebComponents'
import {IBlogPostsActions, IBlogPostsEntities, IBlogPostsItemState} from './../API'
import {BlogPostsActions} from './../BlogPostsActions'
import {BlogPostsService} from './../BlogPostsService'
import {HTTPClient} from 'Core/HTTPClient'

export interface IBaseBlogPostCardOwnProps {
  value: string
  cid: string
  // onHide?: (value: string) => void
  // onToggleFullView?: (value: string) => void
}

export interface IBaseBlogPostCardProps extends
  IBaseBlogPostCardOwnProps,
  IBlogPostsEntities {
  actions: IBlogPostsActions
}

export interface IBaseBlogPostCardState {
  isLoading: boolean
}


export class BaseBlogPostCard extends React.Component<IBaseBlogPostCardProps, IBaseBlogPostCardState> {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    const post = this.props.entities.posts && this.props.entities.posts[this.props.value]
    if (!post) {
      this.load()
    }
  }

  load = () => {
    this.setState({isLoading: true})
    this.props.actions.get(this.props.value, this.props.cid)
     .then(() => this.setState({isLoading: false}))
  }

  handleOnToggleFullView = () => {
    // this.props.onToggleFullView(this.props.value)
  }

  render() {
    return (
      <div>
        <div>
          BlogPostItem
        </div>
        {this.state.isLoading ? 'Loading... ' : null}
        {this.props.entities && this.props.entities.posts && JSON.stringify(this.props.entities.posts[this.props.value])}
      </div>
    )
  }
}

const mS2P = (state, ownProps) => {
  return {
    entities: state.entities
  }
}

const mD2P = (dispatch, ownProps) => {
  let actions = new BlogPostsActions(new BlogPostsService(new HTTPClient()), dispatch)
  return {
    actions
  }
}

export const BlogPostCard = connect<IBaseBlogPostCardOwnProps>(mS2P, mD2P)(BaseBlogPostCard)
