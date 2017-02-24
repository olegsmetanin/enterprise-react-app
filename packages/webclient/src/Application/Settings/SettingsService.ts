import {
    IHTTPClient
} from 'Core/API'
import {
    ISettingsService,
    ISettings
} from './API'
export class SettingsService implements ISettingsService {

  constructor(private httpClient: IHTTPClient) {
  }

  /**
   *
   */
  getSettings(): Promise<ISettings> {
    return Promise.resolve({
      me: {
        displayName: 'qwe'
      },
      config: {
          'qwe': 'asd'
      }
    })

    // return this.httpClient
    //   .POST(`${this.restPath}/settings`)
  }

}