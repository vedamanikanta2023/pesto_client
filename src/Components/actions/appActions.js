import {createSlice}from '@reduxjs/toolkit'
// const initialState = {
//     isLoggedIn:false,
//     loginDetails:{}
// }
const initialState = {
    "isLoggedIn": true,
    "loginDetails": {
        "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZlZGFtIiwiaWF0IjoxNzE4NzA4MzM1fQ.y32o7RubjEjlv2SQN7fLV2qItGmqfU6iRqmpdWohckc",
        "isUserVerified": true,
        "_id": "666c258e53eb9c3a269039b3",
        "profileDetials": {
            "_id": "666d6dc5c7c24f61327e7282",
            "name": "vedam",
            "age": "88",
            "gender": "male",
            "mobile": "90909090990",
            "mail": "mailaddress@gmil.com",
            "user_id": "666c258e53eb9c3a269039b3",
            "user_type": "employer"
        }
    },
    "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNkZmFkIiwiaWF0IjoxNzE4MzYyOTk0fQ.an1aaSKy3Be04W1jREFvt2hOCi5VWNNX93Pm4w-f5qE",
    "_persist": {
        "version": -1,
        "rehydrated": true
    }
}

const appSlice = createSlice({
    name:'App',
    initialState,
    reducers:{
        app:(state,action)=>{
            const type = action.payload.type;
            const payload = action.payload.payload;
            console.log("calling action",{type,payload});
            switch (type) {
                case 'login':
                    state.isLoggedIn = payload.isLoggedIn;
                    state.loginDetails = payload.loginDetails;
                    break;
                case 'logout':
                    state.isLoggedIn = false;
                    state.loginDetails = {};
                    break;
                default:
                    state=initialState;
                    break;
            }
            return state;
            
        }
    }
});

export const appReducer = appSlice.reducer;

export const {app} = appSlice.actions;
