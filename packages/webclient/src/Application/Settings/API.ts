export interface IMe {
  displayName: string
}

export interface IConfig {
}

export interface ISettings {
  me: IMe
  config: IConfig
}

export interface ISettingsActions {
  getSettings(): Promise<void>
}

export interface ISettingsService {
  getSettings(): Promise<ISettings>
}

