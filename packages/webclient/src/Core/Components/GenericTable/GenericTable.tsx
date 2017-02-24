import * as React from 'react'
/* tslint:disable */
import * as ReactRedux from 'react-redux'
/* tslint:enable */
import {Button} from 'WebComponents'

import {IGenericTableActions} from './API'

export interface IGenericTableOwnProps<Query> {
  cid: string
  query: Query
  row: any

  card: any
  item: any
}

export interface IGenericTableProps<Row, Query> extends
  IGenericTableOwnProps<Query> {
  entities: any

  value: string[]

  errors: any

  actions: IGenericTableActions<Query>
  isLoading: boolean
}

export interface IGenericTableState {
  selected: string
}

export class GenericTable<Row, Query> extends React.Component<IGenericTableProps<Row, Query>, IGenericTableState> {

  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  componentDidMount() {
    this.load()
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps', nextProps.entities === this.props.entities)
  // }

  load = () => {
    //this.setState({isLoading: true} as IGenericTableState)
    this.props.actions.getAll(this.props.query, this.props.cid)
    //  .then(() => this.setState({isLoading: false} as IGenericTableState))
  }


  handleSelect = (eid) => {
    console.log('handleSelect', eid)
    this.setState({selected: eid} as IGenericTableState)
  }

  handleHideCard = (eid) => {
    this.setState({selected: null} as IGenericTableState)
  }

  render() {
    let {cid, value, errors, row: Row, card: Card, entities, isLoading} = this.props
    let {selected} = this.state
    console.log('GenericTable props', cid, this.props, isLoading)

    return (
      <div>

        <div>
          GenericTable
        </div>

        {this.props.isLoading ? 'Loading... ' : null}
        Value: {JSON.stringify(value)}
        Errors: {JSON.stringify(errors)}
        {value && (
          <table>
            <tbody>
              {value.map(id => {
                if (selected === id) {
                  return <Card key={id} value={id} onHide={this.handleHideCard}/>
                } else {
                  return <Row key={id} value={id} entities={entities} onSelect={this.handleSelect}/>
                }
              })}
            </tbody>
          </table>
        )}

        <Button
          onClick={this.load}
        >
          Reload List
        </Button>
      </div>
    )
  }
}
