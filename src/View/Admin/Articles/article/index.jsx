import React, { Component } from 'react'
import Editormd from '../../../../Component/Editormd'
export class Article extends Component {
    render() {
        return (
            <div>
                <Editormd props={this.props}/>
            </div>
        )
    }
}

export default Article
