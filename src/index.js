import React from 'react';
import ReactDOM from 'react-dom';
import {Route , Switch,Redirect, BrowserRouter} from 'react-router-dom'
import App from './app';
import { mainRoutes } from './Router';
ReactDOM.render(
  <BrowserRouter>
    <Switch>
        {/* mainRoutes 是一个主要功能路由 */}
          {mainRoutes.map(route=>{
            return <Route key={route.path} {...route}/>
          })}
        {/*App 里面加载的是后台管理系统的路由信息 */}
        <App/>
        <Redirect to='/404'/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
); 

