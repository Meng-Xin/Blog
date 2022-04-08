import Article from '../View/Admin/Articles/article'
import ArticleCate from '../View/Admin/Articles/articlecate'
import cmsHome from '../View/Admin/home'
import ArticleEdit from '../View/Admin/Articles/articleEdit'
import ArticleList from '../View/Admin/Articles/atriclelist'
import ArticleTag from '../View/Admin/Articles/articletag'

import cmsLogin from '../View/Admin/login'


import Login from '../View/Blog/login'
import PageNotFound from '../View/PageNotFount'
import DefaultMain from '../View/Blog/main/index'
import MyBlogHome from '../View/Blog/home'


export const mainRoutes = [
    {
        path :  '/',
        component : MyBlogHome,
        exact : true,
    },
    {
        path : '/login',
        component : Login,
    },
    {
        path : '/cmslogin',
        component : cmsLogin,
    },
    {
        path : '/main',
        component : DefaultMain,
    },
    {
        path : '/404',
        component:PageNotFound,
    }
]

export const adminRoutes = [
    {
        path:'/admin',
        component : cmsHome,
        exact : true,
        isShow : true,
    },
    {
        path : '/admin/article',
        component : Article,
        exact : true,
        isShow : true,
        
    },
    {
        path : '/admin/article/edit/:id',
        component : ArticleEdit,
        exact : false,
    },
    {
        path : '/admin/articlecate',
        component : ArticleCate,
        exact : true,
        isShow : true,
    },
    {
        path : '/admin/articletag',
        component : ArticleTag,
        exact : true,
        isShow : true,
    },
    {
        path : '/admin/articlelist',
        component : ArticleList,
        exact : true,
        isShow : true,
    }

]
