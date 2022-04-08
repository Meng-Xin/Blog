import {post} from '../Utils/request'

/**
 * 管理员登陆
 * @param {*} user 用户信息
 * @returns 
 */
export function loginApi(user) {
    return post("/api/v1/admin/doLogin",user);
}

export function articleUploadApi(user){
    return post("/api/v1/admin/articleUpload")
}