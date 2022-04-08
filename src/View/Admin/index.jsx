import React, { Component } from 'react'
import {Link ,Route,Switch,Redirect} from 'react-router-dom'
import { Layout, Menu, Avatar, Breadcrumb,Dropdown,message} from 'antd';
import { UserOutlined,LaptopOutlined,NotificationOutlined ,HomeOutlined,DownOutlined } from '@ant-design/icons';

import {clearToken} from '../../Utils/auth'

import './index.css'
// import CmsHome from './home'
// import Article from './Articles/article'
// import ArticleCate from './Articles/articlecate'
import {adminRoutes} from '../../Router/index'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const routes =[
    {path:'',breadcrumbName:'Home'},
    {path:'',breadcrumbName:'Article'},
    // {path:'',breadcrumbName:'Test'},
]
function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
}


export class cmsMain extends Component {

    getPath = ()=>{
        // const  nowpath = this.props.location.pathname.split('/')
        // // console.log("当前路径信息：",this.props.location.pathname)
        // for (let i=1;i<nowpath.length;i++){
        //     routes.push({path:nowpath[i],breadcrumbName:nowpath[i]})
        //     // console.log("长度",nowpath.length,"数组信息",nowpath[1])
        // }
        let  nowpath = this.props.location.pathname.replace('/','').split('/')
        for (let i=0;i<nowpath.length;i++){
            routes[i].path = nowpath[i]
            console.log("长度",nowpath.length,"数组信息",nowpath[i])
        }
        console.log(nowpath,"routes：",routes)

    }
    componentDidMount(){
        this.getPath();  
    }
    //右上角头像下拉菜单
    menus = (
        <Menu onClick={p=>{
            if (p.key === "logout"){
                clearToken();
                this.props.history.push('/cmslogin')
            }else{
                message.info(p.key)
            }
        }}>
        <Menu.Item key="noti">通知中心</Menu.Item>
        <Menu.Item key="setting">设置</Menu.Item>
        <Menu.Item key="logout"> 退出 </Menu.Item>
        </Menu>
    );
    render() {
        return (
            <div className="main-box">
               <Layout>
                <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >               
                <div className="logo" />
                    <Menu
                    theme="dark" 
                    mode="inline"
                    // defaultSelectedKeys={['0']}
                    // defaultOpenKeys={['sub0']}
                    style={{ height: '100%', borderRight: 0,lineHeight:120}}
                    >
                    <Menu.Item key="0" icon={  <HomeOutlined />}><Link to='/admin'>首页</Link></Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" >
                        <Menu.Item key="1" icon={<UserOutlined />}><Link to='/admin/article'>发布文章</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/admin/articlelist'>发布列表</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/admin/articlecate'>分类管理</Link></Menu.Item>
                        <Menu.Item key="4"><Link to='/admin/articletag'>标签管理</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="消息管理">
                        <Menu.Item key="5">评论管理</Menu.Item>
                        <Menu.Item key="6">留言管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="用户管理">
                        <Menu.Item key="9">用户列表</Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                    <Layout>
                    {/* 头部 */}
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 ,minHeight: 100 }} >
                        <div className="NavBar">
                             {/* 左侧  面包屑导航 */}
                             <Breadcrumb itemRender={itemRender} routes={routes} />
                            {/* <div className="Nav-left">
                               
                            </div> */}
                            {/* 右侧  导航条右侧部分 头像退出登录 */}
                            <div className="Nav-right">
                                <Dropdown overlay={this.menus} trigger={['click']} >
                                    <div>
                                    <Avatar size={40} src="https://beego-xiaomi-store.oss-cn-shenzhen.aliyuncs.com/static/RESTfulApi/upload/%E5%B0%8F%E9%B8%9F.jpeg"></Avatar>
                                    <span style={{color:"rgb(0 0 0 / 55%)"}}>超级管理员</span>
                                    <DownOutlined />
                                    </div>
                                    {/* <span>超级管理员</span> */}
                                </Dropdown>
                             </div>
                        </div>
                        {/* TODO  历史浏览菜单 */}
                        <div className="hisBrows">
                            <div className="browsMenu">

                            </div>
                            <div>

                            </div>
                        </div>
                    </Header>
                    {/* 主体 */}
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 580, margin: 0 }}>
                    
                        <Switch>
                            {adminRoutes.map(route =>{
                                return <Route key={route.path} {...route} props={route.path}/>;
                            })}
                            <Redirect to='/404'/>
                        </Switch> 
                        </div>
                    </Content>
                    {/* 尾部 */}
                    <Footer style={{ textAlign: 'center', minHeight:20}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
               
            </div>
           
        )
    }
}

export default cmsMain
