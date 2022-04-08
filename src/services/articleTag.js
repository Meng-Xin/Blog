import {get,post,put,del} from '../Utils/request'

/**
 * 
 * @param {*} data 创建文章分类的名字
 * @returns 
 */
export function  CreateArticleTagApi(TagName) {
    return post("/api/v1/admin/article/tag",TagName);
}

/**
 * 
 * @param {*} data 获取当前所有的文章分类信息 
 * @returns 
 */
export function GetArticleTagApi(data){
    return get("/api/v1/admin/article/tag",data)
}


/**
 * @param {*} data 删除当前的 文章分类信息
 * @returns 
 */
 export function DelArticleTagApi(data){
    return del("/api/v1/admin/articleTag",data)
}

/**
 * 
 * @param {*} data 修改当前所有的文章分类信息 
 * @returns 
 */
 export function PutArticleTagApi(data){
    return put("/api/v1/admin/articleTag",data)
}
