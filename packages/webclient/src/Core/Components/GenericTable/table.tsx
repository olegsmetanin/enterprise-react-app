/* tslint:disable */
import * as React from 'react'
import * as ReactRedux from 'react-redux'
/* tslint:enable */
import {connect} from 'react-redux'
import {GenericTable} from './GenericTable'

import {IGetAllService} from 'Core/API'
import {GenericTableActions} from './GenericTableActions'
import {entitiesShallowEquals} from 'Utils/entitiesShallowEquals'
export function table<Row, Query>({
  service,
  entitiesSelector,
  row,
  card
}: {
  service: IGetAllService<Query>
  entitiesSelector: (values, entities) => any,
  row: any,
  card: any
}): any {
  class BaseTable extends GenericTable<Row, Query> {

  }

  let lastEntities = {}

  const mS2P = (state, ownProps) => {
    const st = state.tables[ownProps.cid]

    let entities = entitiesSelector((st && st.value) || [], state.entities)
    // console.log('table mS2P', ownProps.cid, entities, lastEntities, entitiesShallowEquals(lastEntities, entities))

    if (entitiesShallowEquals(lastEntities[ownProps.cid], entities)) {
      entities = lastEntities[ownProps.cid]
    } else {
      lastEntities[ownProps.cid] = entities
    }

    return {
      ...st,
      row,
      card,
      entities
    }
  }
  const mD2P = (dispatch) => ({
    actions: new GenericTableActions(service, dispatch)
  })

  const component = connect(mS2P, mD2P)(BaseTable)

  return component
  //return BaseTable
}