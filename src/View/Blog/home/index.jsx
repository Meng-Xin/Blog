import React,{useState,useEffect} from 'react'
import Navigation from '../../../Component/Navigation'
import {Row, message, List,Tag,Space,Card,Avatar} from 'antd'

import { GetArticleListApi } from '../../../services/articles';
import { StarOutlined, MessageOutlined ,LikeOutlined} from '@ant-design/icons';

import "./index.css"

const listData = [];
// function setListData(data){
//   listData.push({
//     href: 'localhost:3000/articleList?id='+data.id,
//     title: data.title,
//     avatar: data.cover_img,
//     articleTag:data.Tag,
//     content:data.content,
//   });
// }
export default function MyBlogHome() {


  const [logData, setLogData] = useState([]);
  const [loading,setLoading] = useState(false)
  const page = 0
  //加载数据初始化
  useEffect(() => {
    fetchData(page)
    setLoading(true)
  }, []);
  // 数据更新 请求接口http://127.0.0.1:8080/api/v1/admin/article/list?page=_
  function fetchData (page){
      GetArticleListApi({ 
          "page":page
      }).then(res=>{
          // setListData(res.data)
          listData.push(res.data)
          setLogData(listData)
          page = page + 3
          
      }).catch(err=>{
          message.error("获取文章列表失败",err)
      })
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  console.log("当前的data",logData);

    return (
        <div className="g-article-list"   >
            <Navigation> 公共头部 </Navigation>
            <Row justify="center"  >
                 {
                   logData.length>0?logData[0].map((item,index)=>{return(
                   <div key={index} className="scrollitem">
                      <List
                          itemLayout="vertical"
                          size="large"
                      > 
                
                        <List.Item
                          key={item}
                          actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                          ]}
                          extra={
                            <img
                              width={272}
                              alt="logo"
                              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                          }
                        >
                        <List.Item.Meta
                          title={<a href="https://ant.design">{item.title}</a>}
                          description={<List.Item 
                            
                            key={item.Tag.tag_id}
                            actions={[
                            <Tag color={item.Tag.tag_color}>{item.Tag.tag_name}</Tag>,
                            <Tag>1</Tag>,
                            <Tag>1</Tag>,
                          ]} />}
                        />
                        文章内容：{item.content.slice(1,100)}
                        </List.Item>   
                      </List>
                   </div>
                   )}):null
                 }
            </Row>
        </div>
    )
}
