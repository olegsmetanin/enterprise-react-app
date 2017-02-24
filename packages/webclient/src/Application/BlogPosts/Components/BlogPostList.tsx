// import * as React from 'react'
// /* tslint:disable */
// import * as ReactRedux from 'react-redux'
// /* tslint:enable */
// import {connect} from 'react-redux'
// import {Button} from 'WebComponents'
// import {IBlogPostsActions, IBlogPostsEntities, IBlogPostsListState} from './../API'
// import {BlogPostsActions} from './../BlogPostsActions'
// import {BlogPostsService} from './../BlogPostsService'
// import {HTTPClient} from 'Core/HTTPClient'
// import {BlogPostCard} from './BlogPostCard'

// export interface IBaseBlogPostListOwnProps {
//   cid: string,
//   query: any
// }

// export interface IBaseBlogPostListProps extends
//   IBaseBlogPostListOwnProps,
//   IBlogPostsEntities,
//   IBlogPostsListState {
//   actions: IBlogPostsActions
// }

// export interface IBaseBlogPostListState {
//   isLoading: boolean,
//   selected: string
// }

// export class BaseBlogPostList extends React.Component<IBaseBlogPostListProps, IBaseBlogPostListState> {

//   constructor(props) {
//     super(props)
//     this.state = {
//       isLoading: false,
//       selected: null
//     }
//   }

//   componentDidMount() {
//     if (!this.props.value) {
//       this.load()
//     }
//   }

//   load = () => {
//     this.setState({isLoading: true} as IBaseBlogPostListState)
//     this.props.actions.getAll(this.props.query, this.props.cid)
//       .then(() => this.setState({isLoading: false} as IBaseBlogPostListState))
//   }


//   handleHide = (eid) => {
//     this.setState({selected: eid} as IBaseBlogPostListState)
//   }
//   render() {
//     let {value} = this.props
//     let {selected} = this.state
//     console.log('BlogPostList value', value)

//     return (
//       <div>

//         <div>
//           BlogPostList
//         </div>

//         {this.state.isLoading ? 'Loading... ' : null}
//         {value ? (
//           <div>
//             {value.map(eid => {
//               let component;
//               if (selected && selected === eid) {
//                 component = <BlogPostCard key={eid} value={eid}/>
//               } else {
//                 component = <BlogPostCard key={eid} value={eid}/>
//                 // <BlogPostListRow key={eid} value={}/>
//               }
//               return component
//           })}
//           </div>
//         ) : null
//         }
//         <Button
//           onClick={this.load}
//         >
//           Reload List
//         </Button>
//       </div>
//     )
//   }
// }

// const mS2P = (state, ownProps) => {
//   return {
//     ...state.blogPostList[ownProps.cid],
//     entities: state.entities
//   }
// }

// const mD2P = (dispatch, ownProps) => {
//   let actions = new BlogPostsActions(new BlogPostsService(new HTTPClient()), dispatch)
//   return {
//     actions
//   }
// }

// export const BlogPostList = connect<IBaseBlogPostListOwnProps>(mS2P, mD2P)(BaseBlogPostList)
