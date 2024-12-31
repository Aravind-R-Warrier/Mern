import {server_Url} from './serverUrl'
import {commonApi} from './commonApi'

// register APi

export const registerApi=async(user)=>{
    return await commonApi('POST',`${server_Url}/register`,user,"")
}
// login APi

export const loginApi=async(user)=>{
    return await commonApi('POST',`${server_Url}/login`,user,"")
}

// addProjectapi
export const addProjectApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${server_Url}/add-project`,reqBody,reqHeader)
}
// getHomeProjectapi
export const getHomeProjectApi=async()=>{
    return await commonApi('GET',`${server_Url}/home-projects`,"","")
}
// getAllProjectapi
export const getAllProjectApi=async(reqHeader,searchKey)=>{
    return await commonApi('GET',`${server_Url}/all-projects?search=${searchKey}`,"",reqHeader)
}
// getUserProjectapi
export const getUserProjectApi=async(reqHeader)=>{
    return await commonApi('GET',`${server_Url}/user-projects`,"",reqHeader)
}
// updateProjectApi
export const updateProjectApi=async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${server_Url}/projects/${id}/update`,reqBody,reqHeader)
}

// deleteProjectApi
export const deleteProjectApi=async(id,reqHeader)=>{
    return await commonApi('DELETE',`${server_Url}/projects/${id}/delete`,{},reqHeader)
}
