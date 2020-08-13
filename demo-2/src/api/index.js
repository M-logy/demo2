import request from '../utils/request'

export const getList=(data)=>{
    return request.get('/api/v5/getuser',data)
}

export const loginPost=(data)=>{
    return request.post('/api/v1/login',data)
}

export const delPost=(data)=>{
    return request.post('/api/v5/deleteUser',data)
}

export const addPost=(data)=>{
    return request.post('/api/v5/add',data)
}


export const editPost=(data)=>{
    return request.post('/api/v5/updateUser',data)
}

export const pagePost=(data)=>{
    return request.post('https://blogs.zdldove.top/Home/Apis/listWithPage',data)
}


export const phpGet = (data) => {
    return request.get('/phph/index.php',data)
}
