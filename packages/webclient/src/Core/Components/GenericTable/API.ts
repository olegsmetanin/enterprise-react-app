export interface IGenericTableActions<Query> {

  getAll(query: Query, cid: string): Promise<void>

}
