import {
    EActionTypes
} from 'API'
import {
    ENTITIES_UPDATE
} from 'Application/Entities/EntitiesActionTypes'

import {
    IBlogPostsService,
    IBlogPostsActions
} from './API'
import {
    BLOG_POSTS_LIST_REQUEST,
    BLOG_POSTS_ITEM_REQUEST
} from './BlogPostsActionTypes'


export class BlogPostsActions implements IBlogPostsActions {

    constructor(private service: IBlogPostsService, private dispatch: any) {
    }

    /**
     *
     */
    async getAll(query: any, cid: string) {
        await this.service
            .getAll(query)
            .then(res => {
                this.dispatch({
                    type: ENTITIES_UPDATE,
                    payload: res.entities,
                    isCompact: false
                })
                this.dispatch({
                    type: `${BLOG_POSTS_LIST_REQUEST}${EActionTypes.SUCCESS}`,
                    payload: {
                        value: res.value
                    },
                    cid: cid
                })
            })
        return Promise.resolve()
    }

    async get(eid: string, cid: string) {
        await this.service
            .get(eid)
            .then(res => {
                this.dispatch({
                    type: ENTITIES_UPDATE,
                    payload: res.entities
                })
                this.dispatch({
                    type: `${BLOG_POSTS_ITEM_REQUEST}${EActionTypes.SUCCESS}`,
                    payload: {
                        value: res.value
                    },
                    cid: cid
                })
            })
        return Promise.resolve()
    }

}