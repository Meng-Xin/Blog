import React, { Component } from 'react'

import FroalaEditor from 'react-froala-wysiwyg'
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// Require Editor CSS files. css样式
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Editor JS files. Js组件
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Font Awesome. 字体样式
import 'font-awesome/css/font-awesome.css';

//语言
import 'froala-editor/js/languages/zh_cn'

//引入按钮插件
import 'froala-editor/js/plugins.pkgd.min.js';


export class ArticleAbandon extends Component {
    state = {model:'Example test'}
    handleModelChange=(model)=>{
        this.setState({model:model})
        console.log(model)
    }
    render() {
        return (
            <div id="froala-editor">
               <FroalaEditor className='div#froala-editor' model={this.state.model} onModelChange={this.handleModelChange} 
                    
                    config= {{
                        language: 'zh_cn',
                        tabSpaces: 4,
                        height: 480,
                        heightMax: 550, 
                        toolbarButtons: {
                          'moreText': {
                            'buttons': ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'textColor','strikeThrough', 'subscript', 'superscript', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
                            'align': 'left',
                            'buttonsVisible': 6
                          },
                          'moreParagraph': {
                            'buttons': ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOLSimple', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
                            'align': 'left',
                            'buttonsVisible': 6
                          },
                          'moreRich': {
                            'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
                            'align': 'left',
                            'buttonsVisible': 6
                          },
                          'moreMisc': {
                            'buttons': ['undo', 'redo', 'fullscreen', 'html',  'getPDF', 'help'],
                            'align': 'right',
                            'buttonsVisible': 4
                          }
                        }
                        
                    }}
                />
                {/* <FroalaEditorView
                    model={this.state.content}
                /> */}
            </div>
        )
    }
}

export default ArticleAbandon
  