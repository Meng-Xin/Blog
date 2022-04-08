import React, { useState } from 'react'
import Editor from 'md-editor-rt'
import {Card,Input ,Button } from 'antd'
import 'md-editor-rt/lib/style.css';
import '../Component/main.css'
// import { articleUploadApi } from '../services/auth';
import PopForm from './PopForm'
export default function Editormd(props) {
    //文章标题 、文章内容  hooks 还有打算把 弹出窗的全部丢进来
    const [md,setMd] = useState('');
    const [title,setTitle] = useState('');

    const handlerOnsave=(val)=>{
        val = md
        console.log("当前文章内容：",val,"当前标题：",title)
    }
    
    return (
            <Card title='发布文章' bordered={false} style={{fontWeight:700}}>
                <Card title={
                    <div className='ArticleTitle-style'>
                        <Input placeholder='请输入文章标题！'defaultValue={title}  size='middle' style={{display:'inline-block' ,width:'80%'}} onChange={(e)=>{setTitle(e.target.value)}} /> 
                        <Button type="ghost" >保存文章</Button>
                        {/* <Button type="primary" onClick={saveArticle}>发布文章</Button> */}
                        {/* 定义了一个弹出窗组件 */}
                        <PopForm md={md} title={title} />
                    </div>             
                }bordered={false} style={{padding:0}}>
                    <Editor editorId="contains"  theme='light' modelValue={md} onChange={(v) => setMd(v)}onSave={({md})=>{handlerOnsave()}}
                    
                    />
                </Card>
            </Card>
    )
}
