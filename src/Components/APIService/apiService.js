// const port = 'https://nc709rwm-3001.inc1.devtunnels.ms/';
const port = 'http://localhost:3001/'

export const addNewTodo = async(payload,token)=>{
    return new Promise((resolve,reject)=>{
        fetch(port+'addtodo',{
            method:'POST',
            headers:{
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(payload)
        })
        .then(response=>response.json())
        .then(data=>resolve(data))
        .catch(e=>{
            reject({status:500,message:'Something went wrong, while adding NewTodo'});
        });
    })
}

export const editPreviousTodo = async(payload,token)=>{
    return new Promise((resolve,reject)=>{
        fetch(port+'edittodo',{
            method:'PUT',
            headers:{
                "Content-Type":'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(payload)
        })
        .then(response=>response.json())
        .then(data=>resolve(data))
        .catch(e=>{
            console.log('put todo error',e);
            reject({status:500,message:'Something went wrong, while editing previous todo'});
        })
    })
}

export const deletingTodo = async(id,token)=>{
    return new Promise((resolve,reject)=>{
        fetch(port+'deletetoto',{
            method:'DELETE',
            headers:{
                "Content-Type":'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({id})
        })
        .then(response=>response.json())
        .then(data=>resolve(data))
        .catch(e=>{
            console.log('Deleting todo error',e);
            reject({status:500,message:'Something went wrong, while deleting todo'});
        });
    })
}

export const getTodos = async()=>{
    return new Promise((resolve,reject)=>{
        fetch(port+'todos')
        .then(response=>response.json())
        .then(data=>resolve(data))
        .catch(e=>{
            console.log('get todos error',e)
            reject({status:500,message:'Something went wront'})
        })
    })
}

export const createUser = async(payload)=>{
    return new Promise((res,rej)=>{
        fetch(port+'createuser',{
            method:'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify(payload)
        })
        .then(response=>response.json())
        .then(data=>{
            res(data);
        })
        .catch(e=>{
            console.error('post error',e);
            rej({status:500,message:"Something went wrong"});
        });
        });
}

export const loginUser = async(payload)=>{
    return new Promise((res,rej)=>{
        fetch(port+'login',{
            method:'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify(payload)
        })
        .then(response=>response.json())
        .then(data=>{
            res(data);
        })
        .catch(e=>{
            console.log('post error',e);
            rej({status:500,message:"Something went wrong"});
        });
        });
}

export const profileDetails = async(payload,authString)=>{
    return new Promise((res,rej)=>{
        fetch(port+'profilecreate',{
            method:'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json',
            },
            Authorization:'Bearer '+ authString,
            body:JSON.stringify(payload)
        })
        .then(response=>response.json())
        .then(data=>res(data))
        .catch(e=>{
            console.log("Create Profile Error",e);
            rej({status:500,message:'Something went wrong'});
        })
    })
}