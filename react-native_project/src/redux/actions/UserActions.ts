import {User} from "../../models/user";

export enum UserActionTypes {
  LOGIN_REQUEST = 'Login Request',
  LOGIN_REQUEST_SUCCESS = 'Login Request Success',
  USER_ERROR_OCCURRED = 'User Error Occurred',
  USER_LOGOUT = 'User Logout',
  USER_UPDATE_ACTION = 'User Update Action',
}

export class UserActions {
  static LoginRequestAction = () => ({
    type: UserActionTypes.LOGIN_REQUEST,
  });

  static LoginRequestSuccessAction = (user: User) => ({
    type: UserActionTypes.LOGIN_REQUEST_SUCCESS,
    payload: user,
  });
  static UserErrorOccurred = () => ({
    type: UserActionTypes.USER_ERROR_OCCURRED,
  });
  static UserLogoutAction = () => ({
    type: UserActionTypes.USER_LOGOUT,
  });
  static UserUpdateAction = (user:User) => ({
    type: UserActionTypes.USER_UPDATE_ACTION,
    payload: user
  });
}
