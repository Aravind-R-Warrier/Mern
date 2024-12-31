import axios from 'axios'


export const commonApi=async (httpReq,url,reqBody,reqHeaders)=>{
   const reqConfig={
    method:httpReq,
    url,
    data:reqBody,
    headers:reqHeaders?reqHeaders:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}