import * as React from 'react';
import { profileDetails } from './APIService/apiService';
import { useSelector } from 'react-redux';

const initialState = {
    name:'',
    age:'',
    gender:'male',
    mobile:'',
    mail:'',
    userType:'employer'
};

const reducer = (state,action)=>{
    switch (action.type) {
        case 'onchange':
            return {...state,[action.payload.key]:action.payload.value};
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

const ProfileCreate = (props)=>{
    const [state,dispatch] = React.useReducer(reducer,initialState);
    const userId= useSelector(store=>store.app.loginDetails);

    const onChange=e=>{
        const key = e.target.name;
        const value = e.target.value;
        dispatch({type:'onchange',payload:{key,value}});
    }

    const fomatPayload = ()=>{
        const type = state.userType;
        delete state.userType
        state['user_id'] = userId._id;
        state['user_type'] = type;
        return state;
    }

    const saveProfileDetails=async()=>{
        const payload = fomatPayload();
        const profileCreateResponse =await profileDetails(payload);
        console.log('profileCreateResponse',profileCreateResponse);
        props.close(false);
    }

    return(
        <div className='flex flex-col items-start px-3 rounded-lg p-2 bg-yellow-100'>
            <label>Name</label>
            <input name='name' value={state.name} onChange={onChange} className='mb-2' />

            <label>Age</label>
            <input name='age' value={state.age} onChange={onChange} className='mb-2' />

            <label htmlFor="gender" className="block text-sm font-medium text-gray-900 dark:text-white">Gender</label>
            <select name='gender' onChange={onChange} defaultValue={state.gender} id="gender" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value='male'>Male</option>
                <option value="female">Female</option>
            </select>

            <label>MobileNumber</label>
            <input name='mobile' value={state.mobile} onChange={onChange} className='mb-2' />

            <label>Mail</label>
            <input name='mail' value={state.mail} onChange={onChange} className='mb-2' />

            <label htmlFor="userType" className="block text-sm font-medium text-gray-900 dark:text-white">User Type</label>
            <select name='userType' onChange={onChange} defaultValue={state.userType} id="gender" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-1 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value='employer'>Employer</option>
                <option value="jobseeker">Job Seeker</option>
            </select>
            
            <button type="button" onClick={saveProfileDetails} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2">Green to Blue</button>
        </div>
    )
}

export default ProfileCreate;