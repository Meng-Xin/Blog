import React, { useState ,useEffect} from 'react'
import Editor from 'md-editor-rt'
import {Row,Col,Affix} from 'antd'

import 'md-editor-rt/lib/style.css';
import './index.css'
import { GetArticlesApi } from '../../../services/articles';
import Navigation from '../../../Component/Navigation';

//文章详情页面
export default function ShowMarkDown(props) {
    //文章标题 、文章内容  hooks 还有打算把 弹出窗的全部丢进来
    const [mdText, setMdText] = useState('');
    // const [top, setTop] = useState(40);
    // const [title,setTitle] = useState('');
    useEffect(() => {
        GetArticlesApi({
            "id" : 5        //TODO 这里是获取指定文章的id，我目前写一个常量，后面需要改成props，传递过来一个点击的id
        }).then(res=>{
            const {data} = res
            setMdText(data)
        }).catch(err=>{
            console.log(err)
            setMdText('文档读取失败！');
        })
      }, []);
    return (
      <div className="global">
        {/* 替换为一个模块 导航条头部模块 */}
        <Navigation>

        </Navigation>
          
        <div className="g-body">
          <div className="main-container">
            <Row justify="center">
              <Col span="15" ><Editor modelValue={mdText} previewOnly /></Col>
              <Col span="5"  >
                <Affix offsetTop={40}>
                  <div className="g-articleTree">右边的树形控件，暂时还没有做，等待更新！</div>
                </Affix>
              </Col>
            </Row>
  
          </div>
        </div>
          
        <div className="g-foot">
            
        </div>
      </div>
      	
      );


}