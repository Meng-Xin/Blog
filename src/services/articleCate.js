import {get,post,put,del} from '../Utils/request'

/**
 * 
 * @param {*} data 创建文章分类的名字
 * @returns 
 */
export function  CreateArticleCateApi(cateName) {
    return post("/api/v1/admin/article/cate",cateName);
}

/**
 * 
 * @param {*} data 获取当前所有的文章分类信息 
 * @returns 
 */
export function ArticleCateInfoApi(data){
    return get("/api/v1/admin/article/cate",data)
}


/**
 * @param {*} data 删除当前的 文章分类信息
 * @returns 
 */
 export function DelArticleCate(data){
    return del("/api/v1/admin/articleCate",data)
}

/**
 * 
 * @param {*} data 修改当前所有的文章分类信息 
 * @returns 
 */
 export function PutArticleCate(data){
    return put("/api/v1/admin/articleCate",data)
}
