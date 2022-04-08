import {get,post,put,del} from '../Utils/request'


export function GetArticleListApi(page = 1) {
    return get("/api/v1/admin/article/list",page);
}

export function GetArticlesApi(id) {
    return get("/api/v1/admin/article",id);
}
export function  CreateArticleApi(data) {
    return post("/api/v1/admin/article/create",data);
}

export function modifyOne(id,data) {
    return put(`/api/v1/admin/article/${id}`,data);
}

export function delOne(id) {
    return del(`/api/v1/admin/article/${id}`);
}