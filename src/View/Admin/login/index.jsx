import React, { Component } from 'react'
import LoginBar from '../../../Component/LoginBar'
import './index.css'
export class cmsLogin extends Component {
    render() {
        return (
            <div className="login-container">
                <div className="login-card">
                   
                </div>
                <div className="login-form-sty">
                    <LoginBar props={this.props}/>
                </div>
            </div>
            
        )
    }
}

export default cmsLogin
