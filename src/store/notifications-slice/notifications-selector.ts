import {AppState} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';
import {NotificationsData} from '../../types/types.ts';

export const getNotificationsSelector = (state: AppState): NotificationsData[] =>
  state[NameSpace.Notifications].notificationsDetails || [];


