import {
    ISettingsService,
    ISettingsActions
} from './API'
import {
    SETTINGS_REQUEST
} from './SettingsActionTypes'
import {
    EActionTypes
} from 'API'

export class SettingsActions implements ISettingsActions {

    constructor(private service: ISettingsService, private dispatch: any) {
    }

    /**
     *
     */
    async getSettings() {
        await this.service
            .getSettings()
            .then(res =>
                this.dispatch({
                    type: `${SETTINGS_REQUEST}${EActionTypes.SUCCESS}`,
                    payload: res
                })
            )
        return Promise.resolve()
    }

}