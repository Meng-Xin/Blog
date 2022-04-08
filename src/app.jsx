import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import cmsMain from './View/Admin/'
// import cmsLogin from './View/Admin/login/index'
import {isLogined} from './Utils/auth'
export class app extends Component {
    
    // componentDidMount(){
    //     console.log('当前是否登录:',isLogined())
    // }
    render() {
        return ( isLogined()?(
            <div>
                <Switch>
                <Route path='/admin'component={cmsMain} ></Route>
                {/* <Route path='/admin/login'component={cmsLogin} exact={true}></Route> */}
                <Redirect to='/404'/> 
                </Switch>
            </div>
            )
            :<Redirect to='/cmslogin'/>
       
        )   
    }
}

export default app
