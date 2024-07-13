import * as React from 'react';
import CustomPopup from './popup';
import { addNewTodo, deletingTodo, editPreviousTodo, getTodos } from './APIService/apiService';
import './homePage.css';
import { addNewIcon, deleteIcon, editIcon } from '../icons';
import { useSelector } from 'react-redux';

const initialState = {
    id:undefined,
    title:'',
    description:'',
    status: 'todo'
}

const reducer = (state,action)=>{
    switch (action.type) {
        case 'onChange':
            return {...state,[action.payload.key]:action.payload.value};
        case 'edit':
            return {...action.payload};
        case 'reset':
            return {...initialState};
        default:
            return state;
    }
}

const HomePage = (props)=>{
    const [popupOpen,setPopupOpen] = React.useState(false);
    const [todosList,setTodosList] = React.useState([]);
    const [onSuccess,setSuccess] = React.useState('');
    const [errorMessage,setErrorMessage] = React.useState('');
    const [deleteTodo,setDeleteTodo] = React.useState(undefined);
    const [todoState,dispatch] = React.useReducer(reducer,initialState);
    const token = useSelector(state=>state.app.loginDetails.jwtToken);
    console.log('todoState',todoState);
    const onChange = (event)=>{
        const key = event.target.name;
        const value = event.target.value;
        const payload = {key,value};
        dispatch({type:'onChange',payload});
    }

    const shoErrorMessage=(errorMsg)=>{
            setErrorMessage(errorMsg);
            setInterval(()=>{
                setErrorMessage('');
            },5.8*1000)
    }

    const showSuccess =(message)=>{
        setSuccess(message)
    }

    const closePopup=()=>{
        dispatch({type:'reset',payload:null});
        setPopupOpen(false);
    }

    const addTodo =async ()=>{
        if (todoState.title===''){
            alert('Please Enter Title');
            return;
        }
        console.log('todoState',todoState);
        if (todoState._id===undefined){
            delete todoState.id;
            const addTodoResponse = await addNewTodo(todoState,token);
            if (addTodoResponse.status===200){
                showSuccess("Todo Added Successfully");
            }else{
                shoErrorMessage(addTodoResponse.message);
            }
        }else{
            const editTodoResponse = await editPreviousTodo(todoState,token);
            if (editTodoResponse.status===200){
                showSuccess("Todo Edited Successfully");
            }else{
                shoErrorMessage(editTodoResponse.message);
            }
        }
        fetchTodos();
        closePopup();
    }

    const fetchTodos=async()=>{
        const todos = await getTodos();
        console.log('todos',todos)
        if (todos.status===200){
            setTodosList(todos.data?todos.data:[]);

        }else{
            ///show error
        }
    }

    const getStatusString=(status)=>{
        switch (status) {
            case 'todo':
                return 'Todo';
            case 'inProgress':
                return 'In Progress';
            default:
                return 'Done';
        }
    }

    const continueTodoDelete=async()=>{
        const deleteTodoResponse = await deletingTodo(deleteTodo._id,token);
        console.log('deleteTodoResponse',deleteTodoResponse);
        if (deleteTodoResponse.status===200){
            showSuccess(deleteTodoResponse.message);
        }else{
            shoErrorMessage(deleteTodoResponse.message);
        }
        fetchTodos();
        setDeleteTodo(undefined);
    }

    const editTodo=(todo)=>{
        dispatch({type:'edit',payload:{...todo}});
        setPopupOpen(true);
    }

    const handleDeleteTodo =(todo)=>{
        setDeleteTodo(todo);
    }

    React.useEffect(()=>{
        fetchTodos();
    },[]);
    
    return(
    <div>
        <h1>Welcome to Home Page</h1>
        { 
        !!errorMessage&&
        <p className='error-message'>{errorMessage}</p>
        }
        {/* <Resume /> */}
        {/* table start */}
            <div className="w-full p-3">
                <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                    <thead class="text-white">
                        {
                            todosList.map((item)=><tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left" width="110px">Actions</th>
                        </tr>)
                        }
                    </thead>
                    <tbody class="flex-1 sm:flex-none">
                        {
                        todosList.map((singleTodo,index)=><tr key={String(new Date())+String(index)} class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                            <td className="border-grey-light border hover:bg-gray-100 p-3">{singleTodo.title}</td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{singleTodo.description}</td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{getStatusString(singleTodo.status)}</td>
                            <td className="border-grey-light border hover:bg-white-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                                <div className='flex justify-around'>
                                    <span onClick={()=>editTodo(singleTodo)} title='Edit Todo' className='hover:bg-purple-100'>{editIcon}</span>
                                    <span title='Delete Todo' onClick={()=>handleDeleteTodo(singleTodo)} className='hover:bg-yellow-100 rounded-sm'>{deleteIcon}</span>
                                </div>
                            </td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
        {/* table start end*/}
        {
            popupOpen &&
            <CustomPopup title={todoState._id?"Edit Todo":"Add Todo"} showOkButton={true} onClose={()=>{closePopup()}} onSuccess={()=>{addTodo()}}>
                <div
                 className='flex flex-col items-start'
                >
                    <p>Title</p>
                    <input value={todoState.title} name="title" onChange={onChange} className='border w-full mb-2 p-1' />
                    <p>Description</p>
                    <input value={todoState.description} name="description" onChange={onChange} className='border w-full mb-2 p-1' />
                    <p>Status</p>
                    <select name="status" value={todoState.status} onChange={onChange} className='w-full mb-2 p-1'>
                        <option value='todo'>To Do</option>
                        <option value='inProgress'>In Progress</option>
                        <option value='done'>Done</option>
                    </select>
                </div>
            </CustomPopup>
        }
        {
            !!onSuccess &&
            <CustomPopup title="" onClose={()=>setSuccess('')}>
                <p>{onSuccess}</p>
            </CustomPopup>
        }
        {
            deleteTodo!==undefined&&
            <CustomPopup title='Delete Todo' showOkButton={true} onClose={()=>setDeleteTodo(undefined)} onSuccess={continueTodoDelete}>
                <p>Are you sure to Delete this Todo?</p>
            </CustomPopup>
        }
        <div className='add-new-todo cursor-pointer' onClick={()=>setPopupOpen(true)} title='Add Todo' >{addNewIcon}</div>
    </div>
    )
}

export default HomePage;