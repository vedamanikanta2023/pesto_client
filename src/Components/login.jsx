import * as React from 'react';
import './login.css'
import { createUser, loginUser } from './APIService/apiService';
import { useAuth } from './Authentication/Auth';
import { useNavigate } from 'react-router-dom';
import Popup from './CommonComponents/popup';
import ProfileCreate from './profile';

const initState = {
    username:'',
    password:'',
    childname:''
}

const reducer = (state,action)=>{
    console.log('action - - >',action)
    switch (action.type) {
        case 'onchange':
            return {...state,[action.payload.key]:action.payload.value};
        case 'reset':
            return {...initState}
        default:
            return {...state};
    }
}

const LoginPage = (props)=>{
    const auth = useAuth();
    const navigate = useNavigate();

    const [pageType,setPagetype] = React.useState('login');

    const [state,dispatch] = React.useReducer(reducer,initState);
    const [loginError,setLoginError] = React.useState(undefined);
    const [showPopup,setPopup] = React.useState(false);

    const loginSignUPStyle = 'bg-green-400 rounded-lg p-1 px-5';

    const handleSignupClick = async()=>{
        if (pageType!=='login' && state.childname === ''){
            alert("Please Enter Childhood name");
            return;
        }

        if (state.username === '' || state.password === ''){
            alert("Please Enter Username/Password");
            return;
        }

        if (pageType==='login'){
            // loginUser();
            return;
        }
        const response = await createUser(state);
        console.log('response',response);
        if (response && response.status===200){
            dispatch({type:'reset',payload:{}});
        }
        return;
    };

    const removeError =()=> setTimeout(() => {
        setLoginError(undefined)
    }, 6500);

    const handleLoginClick =async()=>{
        // const payload = {
        //     "type": "login",
        //     "payload": {isLoggedIn:true,loginToken:'s5s5asdas5s4asfgwfs5da'}
        // }
        // auth.login(payload);
        delete state.childname
        const loginRes = await loginUser(state);

        console.log('loginRes',loginRes);
        if (loginRes.status===200){
            const {data} = loginRes;
            auth.login({type:'login',payload:{isLoggedIn:true,loginDetails:data}});
            if ( true &&loginRes.data.isUserVerified===false){
                setPopup(true);
            }else{
                navigate('/');
            }
            dispatch({type:'reset',payload:{}});
        }else{
            setLoginError(loginRes.message?loginRes.message:'Some thing went wrong Please try again');
            removeError();
        }
    }

    const onChange = (e)=>{
        dispatch({type:'onchange',payload:{key:e.target.name,value:e.target.value}});
    };

    const closePopup =(val)=>{
        auth.logout();
        setPopup(val);
    }

    return(
        <div className='login-container xs:items-center md:items-end' id='back'>
            {/* <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-black-400 md:text-3xl lg:text-6xl dark:text-white'>Welcome to the Job Portal</h1> */}
            {loginError && <p className='fixed right-10 top-20 error-message'>{loginError}</p>}
            <div className="flex flex-col items-center w-full md:w-1/2">
                <div className='flex flex-col items-start mb-2' >
                    <div className='flex bg-red-300 rounded-lg'>
                        <button onClick={()=>setPagetype('login')} className={pageType==='login'?loginSignUPStyle+' mr-2':'pl-2'}>Login</button>
                        <button onClick={()=>setPagetype('signup')} className={pageType==='login'?'pr-2':loginSignUPStyle+' ml-2'}>SingnUp</button>
                    </div>
                    <label htmlFor="username" className="block mb-2 text-white md:text-black text-sm font-medium dark:text-white">Username</label>
                    <input type="text" 
                    value={state.username}
                    id="username" 
                    name='username'
                    onChange={onChange}
                    className="block w-full text-sm text-slate-500
                            mr-4 py-2 px-4
                            rounded-lg border-
                            text-sm font-semibold
                            bg-#d1fae5 text-black-700
                            hover:bg-violet-100
                            " 
                    placeholder="Enter Password" 
                    required />
                </div>
                <div className='flex flex-col items-start mb-2'>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white md:text-black dark:text-white">Password</label>
                    <input 
                    type="password" 
                    value={state.password} 
                    className="block w-full text-sm text-slate-500
                            mr-4 py-2 px-4
                            rounded-lg border-
                            text-sm font-semibold
                            bg-#d1fae5 text-black-700
                            hover:bg-violet-100
                            " 
                    id="password" 
                    name="password"
                    onChange={onChange}
                    placeholder="Enter Password" 
                    required />
                </div>
                {
                    pageType!=='login' &&
                <div className='flex flex-col items-start mb-2'>
                    <label htmlFor="childname" className="block mb-2 text-sm font-medium text-white md:text-black dark:text-white">ChildHood name</label>
                    <input 
                    type="text"  
                    value={state.childname}
                    className="block w-full text-sm text-slate-500
                            mr-4 py-2 px-4
                            rounded-lg border-
                            text-sm font-semibold
                            bg-#d1fae5 text-black-700
                            hover:bg-violet-100
                            " 
                    id="childname" 
                    name='childname'
                    onChange={onChange}
                    placeholder="Enter Childhood Name" 
                    required />
                </div>
                }
                <button onClick={pageType==='login'? handleLoginClick : handleSignupClick} className='group h-8 bg-gradient-to-br text-white from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white rounded-lg border w-20'>{pageType}</button>
            </div>
            {
                showPopup &&
                <Popup close={closePopup}>
                    {/* <button onClick={()=>setPopup(false)}>close popup</button> */}
                    <ProfileCreate  close={closePopup} />
                </Popup>
            }
        </div>
    
    )
}

export default LoginPage;