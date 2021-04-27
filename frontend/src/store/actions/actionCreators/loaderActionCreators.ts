import * as Interfaces from '../../interfaces';
import * as Constants from '../../constants';

export const setMainLoader = (isActive: boolean): Interfaces.IAction => ({
    type: Constants.SET_MAIN_LOADER,
    payload: isActive
});