import {
    EActionTypes
} from 'API'
import {
    ENTITIES_UPDATE
} from 'Application/Entities/EntitiesActionTypes'

import {
    GENERIC_TABLE_REQUEST
} from './GenericTableActionTypes'

import {IGetAllService} from 'Core/API'


export class GenericTableActions<Row, Query> {

    constructor(private service: IGetAllService<Query>, private dispatch) {
    }

    /**
     *
     */
    async getAll(query: any, cid: string) {
        this.dispatch({
            type: `${GENERIC_TABLE_REQUEST}${EActionTypes.BEGIN}`,
            cid: cid
        })
        await this.service
            .getAll(query)
            .then(res => {
                this.dispatch({
                    type: ENTITIES_UPDATE,
                    payload: res.entities,
                    isCompact: true
                })
                this.dispatch({
                    type: `${GENERIC_TABLE_REQUEST}${EActionTypes.SUCCESS}`,
                    payload: {
                        value: res.value
                    },
                    cid: cid
                })
            })
        return Promise.resolve()
    }

}