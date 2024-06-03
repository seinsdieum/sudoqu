import {SettingsState} from "../../types";


export enum ThemeMode {
    AUTO = 0,
    DARK = 1,
    LIGHT = 2,
}

export const settingsReducer = (state: SettingsState = {theme: ThemeMode.AUTO}, action) => {
    switch(action.type) {


        default: return state
    }
}