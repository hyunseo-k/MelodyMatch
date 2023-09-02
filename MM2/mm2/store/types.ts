// types.ts
export interface UserInfo {
    email: string;
    avatar: number;
    gender: string;
    age: number;
    // Add other user information properties
  }
  
  export interface State {
    userInfo: UserInfo | null;
  }
  
  export interface Action {
    type: string;
    payload?: any;
  }
  