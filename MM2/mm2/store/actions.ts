// actions.ts
import { Action } from './types';
import { UserInfo } from './types'

export const updateUser = (userInfo: UserInfo): Action => ({
  type: 'UPDATE_USER',
  payload: userInfo,
});
