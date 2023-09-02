import axios from "axios";
import { ActivityIndicatorBase } from "react-native";

export const userInfo = {
    email: "dum@gmail.com",
    password: "adminadmin",
    avatar: 0,
    gender: '남',
    age: 0,
    friends: [],
};
export const userAPI = {
getUserInfo: async (email, password) => {
    try {
    return axios.get(
        `http://127.0.0.1:8000/user/?email=${email}&password=${password}`
    );
    } catch (e) {
    console.log(e);
    }
},
updateUserInfo: (newInfo) => {
    // 업데이트하고
    // 상태 업데이트해주기
},
createUserInfo: () => {},
};